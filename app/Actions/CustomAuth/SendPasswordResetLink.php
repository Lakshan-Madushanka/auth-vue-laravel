<?php


namespace App\Actions\CustomAuth;


use App\Models\User;
use App\Notifications\PasswordResetRequested;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class SendPasswordResetLink
{
    public function execute(Request $request): JsonResponse
    {

        $request->validate([
            'email' => ['string', 'email', 'required'],
        ]);

        User::whereEmail($request->email)->firstOrFail();

        $code = $this->generateSecureInteger();

        Notification::route('mail', $request->email)
            ->notify(new PasswordResetRequested($code));

        $this->insertResetData($request, $code);

        return response()->json([], 200);
    }

    private function insertResetData(Request $request, $code)
    {
		
        DB::table('password_resets')->insert([
            'email'      => $request->email,
            'code'       => $code,
            'created_at' => now()->toDateTimeString(),
        ]);
    }

    private function generateSecureInteger()
    {
        $secureInteger = random_int(0, 99999);

        return str_pad((string) $secureInteger, 5, 0, STR_PAD_LEFT);
    }

}