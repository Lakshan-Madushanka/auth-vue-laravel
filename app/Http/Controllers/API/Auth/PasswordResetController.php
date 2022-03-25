<?php

namespace App\Http\Controllers\API\Auth;

use App\Actions\CustomAuth\ResetPassword;
use App\Actions\CustomAuth\SendPasswordResetLink;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PasswordResetController extends Controller
{
    public function send(SendPasswordResetLink $sprl, Request $request): JsonResponse
    {
       return $sprl->execute($request);
    }

    public function reset(ResetPassword $pr, Request $request)
    {
       return $pr->execute($request);
    }
}
