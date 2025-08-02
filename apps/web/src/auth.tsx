import googleSvg from "./assets/google.svg";
import spotifyLogo from "./assets/spotifyLogo.svg";
import { Mail } from "lucide-react";
import signUpSideImage from "./assets/signUpSideImage.png";
import googleWhiteLogo from "./assets/googleWhiteLogo.svg";
import spotifyWhiteLogo from "./assets/spotifyWhiteLogo.svg";
import githubWhiteSvg from "./assets/githubWhiteSvg.svg";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://localhost:3003";

export default function Auth() {
    const [isLoginSelected, setIsLoginSelected] = useState(false);
    const navigate = useNavigate();

    const responseGoogle = async (response: any) => {
        try {
            const code = response.code;
            const res = await fetch(`${backendUrl}/auth/login/google`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            });
            const data = await res.json();
            localStorage.setItem('authToken', data.data.token);
            localStorage.setItem('email', data.data.user.email);
            localStorage.setItem('username', data.data.user.username);
            localStorage.setItem('name', data.data.user.name || "");
            localStorage.setItem('profilePic', data.data.user.prifilePic || "");
            localStorage.setItem('isLoggedId', 'true');
            navigate('/dashboard/home');

        }
        catch (error) {
            console.error("Error during Google login:", error);
        }
    };
    const googleLoggin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
        redirect_uri: "http://localhost:5173"
    });

    return (
        <div className="w-[100vw] h-[100vh] flex relative">
            <div className="w-[232px] h-full"></div>
            <div className="flex-1 h-full bg-[#191919]"></div>
            <div className="absolute w-full h-full backdrop-blur-[3px] flex items-center justify-center">
                <div className="flex border-[1px] border-white/10 rounded-[16px] shadow-md/40 shadow-black">
                    {/* Container for both forms with relative positioning */}
                    <div className="relative w-[412px] h-[586px] bg-[#151515] rounded-l-[16px] overflow-hidden">

                        {/* Sign Up Form */}
                        <div className={`absolute inset-0 p-[52px] pb-[20px] flex flex-col justify-center items-center transition-all duration-500 ${isLoginSelected ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"
                            }`}>
                            <div className="text-[24px] mb-[16px] font-bold text-white">Create your account</div>
                            <div className="text-[14px] mb-[20px] font-medium text-[#888888]">Sign up to join Riverside it's free</div>
                            <div className="flex flex-col gap-[12px]">
                                <div className="relative cursor-pointer hover:bg-[#383838] w-[308px] h-[44px] flex items-center rounded-[10px] bg-[#222222] py-[10px] px-[16px]"
                                    onClick={() => { googleLoggin() }}>
                                    <img src={googleSvg} className="h-[20px]" />
                                    <div className="absolute inset-0 flex w-full items-center font-medium justify-center text-[14px] text-white">Continue with Google</div>
                                </div>
                                <div className="relative cursor-pointer hover:bg-[#383838] w-[308px] h-[44px] flex items-center rounded-[10px] bg-[#222222] py-[10px] px-[16px]">
                                    <img src={githubWhiteSvg} className="h-[20px]" />
                                    <div className="absolute inset-0 flex w-full items-center font-medium justify-center text-[14px] text-white">Continue with Github</div>
                                </div>
                                <div className="relative cursor-pointer hover:bg-[#383838] w-[308px] h-[44px] flex items-center rounded-[10px] bg-[#222222] py-[10px] px-[16px]">
                                    <img src={spotifyLogo} className="h-[20px]" />
                                    <div className="absolute inset-0 flex w-full items-center font-medium justify-center text-[14px] text-white">Continue with Spotify</div>
                                </div>
                                <div className="relative cursor-pointer hover:bg-[#383838] w-[308px] h-[44px] flex items-center rounded-[10px] bg-[#222222] py-[10px] px-[16px]">
                                    <Mail className="size-[20px] text-[#bb86fc]" />
                                    <div className="absolute inset-0 flex w-full items-center font-medium justify-center text-[14px] text-white">Continue with Email</div>
                                </div>
                            </div>
                            <div className="mt-[44px] flex text-[11px] text-[#888888] gap-[5px]">
                                <div>By signing up, you agree to our </div>
                                <a href="/terms" className="underline">Terms</a>
                                <div>&</div>
                                <a href="/privacypolicy" className="underline">Privacy Policy</a>
                            </div>
                            <div className="pt-[16px] flex gap-[5px] text-[11px]">
                                <div className="text-[#888888]">Have an account?</div>
                                <div onClick={() => setIsLoginSelected(true)} className="underline text-[#bb86fc] cursor-pointer">Log in</div>
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className={`absolute inset-0 p-[52px] pb-[20px] flex flex-col justify-center items-center transition-all duration-500 ${isLoginSelected ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[100%]"
                            }`}>
                            <div className="text-[24px] mb-[16px] font-bold text-white">Login</div>
                            <div className="text-[12px] mb-[24px] font-medium text-[#888888] flex gap-[5px]">
                                <div>Don't have an account?</div>
                                <div className="text-[#bb86fc] cursor-pointer"
                                    onClick={() => setIsLoginSelected(false)}
                                >Sign up</div>
                            </div>
                            <div className="flex gap-[8px] justify-center">
                                <div className="bg-[#383838] h-[44px] w-[44px] p-[12px] rounded-[10px] cursor-pointer hover:bg-[#444444]">
                                    <img src={googleWhiteLogo} className="h-[20px]" />
                                </div>
                                <div className="bg-[#383838] h-[44px] w-[44px] p-[12px] rounded-[10px] cursor-pointer hover:bg-[#444444]">
                                    <img src={githubWhiteSvg} className="h-[20px]" />
                                </div>
                                <div className="bg-[#383838] h-[44px] w-[44px] p-[12px] rounded-[10px] cursor-pointer hover:bg-[#444444]">
                                    <img src={spotifyWhiteLogo} className="h-[20px]" />
                                </div>
                            </div>
                            <div className="text-[#888888] font-bold text-[12px] my-[20px]">Or</div>
                            <div className="flex flex-col gap-[8px]">
                                <input className="text-white focus:outline-[1px] focus:outline-[#bb86fc]/80 h-[39px] w-[300px] py-[8px] px-[12px] bg-[#2b2b2b] rounded-[8px]  caret-white placeholder:text-white/10 text-[14px]" placeholder="Email" />
                                <input className="text-white focus:outline-1 focus:outline-[#bb86fc]/80  h-[39px] w-[300px] py-[8px] px-[12px] bg-[#2b2b2b] rounded-[8px]  caret-white placeholder:text-white/10 text-[14px]" placeholder="Password" />
                                <div className="bg-[#7848ff] w-[300px] h-[40px] flex items-center justify-center rounded-[10px] hover:bg-[#593cbc] cursor-pointer text-[14px] text-white font-medium">
                                    Log in
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[500px] h-[586px] pl-[36px] rounded-r-[16px] bg-[#0e0e0e]">
                        <div className="w-full h-full flex items-center justify-center">
                            <img src={signUpSideImage} className="w-[464px] h-[460px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}