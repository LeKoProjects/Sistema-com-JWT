<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
        public function register(Request $request)
        {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8'
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json(['token' => $token], 201);
        }

        public function login(Request $request)
        {
            $credentials = $request->only('email', 'password');

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciais inválidas'], 401);
            }

            return response()->json(['token' => $token]);
        }

        public function logout()
        {
            try {
                JWTAuth::invalidate(JWTAuth::getToken());
                return response()->json(['message' => 'Logout realizado com sucesso']);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Falha ao realizar logout'], 500);
            }
        }

        public function me()
        {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                return response()->json($user);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Token inválido ou expirado'], 401);
            }
        }
}
