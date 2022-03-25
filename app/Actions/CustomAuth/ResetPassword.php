<?php


namespace App\Actions\CustomAuth;


use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ResetPassword
{
    public function execute(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => ['string', 'email', 'required'],
            'code'     => ['string', 'required'],
            'password' => ['required', 'confirmed'],
        ]);

        $this->throwExceptions($request);

        $this->resetPassword($request);

        $this->deleteResetRecord($request);

        return response()->json([], 201);
    }

    private function resetPassword(Request $request)
    {
        $user = User::whereEmail($request->email)->firstOrFail();

        $user->password = Hash::make($request->password);

        $user->save();
    }

    private function deleteResetRecord(Request $request)
    {
        DB::table('password_resets')->whereCode($request->code)->delete();

    }

    private function throwExceptions(Request $request)
    {
        $query = DB::table('password_resets')->where([
            ['email', $request->email],
        ])->latest();

        $resetData = $query->first();

        throw_if(is_null($resetData), ValidationException::withMessages(['data' => 'Reset data not found']));

        throw_if(now()->greaterThan(Carbon::parse($resetData->created_at)->addMinutes(5)),
            ValidationException::withMessages(['timeout' => 'Time limit exceeded']));

        throw_if($resetData->attempt >= 3,
            ValidationException::withMessages(['attempts' => 'Max attempt exceeded']));

        if ($resetData->code !== $request->code) {
            $query->increment('attempt', 1);
            throw(ValidationException::withMessages(['code' => 'Invalid code']));
        }

    }
}