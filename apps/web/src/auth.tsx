import googleSvg from "./assets/google.svg";
import appleLogo from "./assets/appleLogo.svg";
import spotifyLogo from "./assets/spotifyLogo.svg";
import { Mail } from "lucide-react";
export default function Auth() {
    return (
        <div className="w-[100vw] h-[100vh] flex relative">
            <div className="w-[232px] h-full"></div>
            <div className="flex-1 h-full bg-[#191919]"></div>
            <div className="absolute w-full h-full backdrop-blur-[3px] flex items-center justify-center">
                <div className="flex border-[1px] border-white/10 rounded-[16px] shadow-md/40 shadow-black">
                    <div className=" w-[412px] h-[586px] p-[52px] pb-[20px] flex flex-col justify-center items-center bg-[#151515] rounded-l-[16px]">
                        <div className="text-[24px] mb-[16px] font-bold text-white">Create your account</div>
                        <div className="text-[14px] mb-[20px] font-medium text-[#888888]">Sign up to join Riverside it's free</div>
                        <div className="flex flex-col gap-[12px]">
                            <div className="relative cursor-pointer hover:bg-[#383838] w-[308px] h-[44px] flex items-center rounded-[10px] bg-[#222222] py-[10px] px-[16px]">
                                <img src={googleSvg} className="h-[20px]" />
                                <div className="absolute inset-0 flex w-full items-center font-medium justify-center text-[14px] text-white">Continue with Google</div>
                            </div>
                            <div className="relative cursor-pointer hover:bg-[#383838] w-[308px] h-[44px] flex items-center rounded-[10px] bg-[#222222] py-[10px] px-[16px]">
                                <img src={appleLogo} className="h-[20px]" />
                                <div className="absolute inset-0 flex w-full items-center font-medium justify-center text-[14px] text-white">Continue with Apple</div>
                            </div>
                            <div className="relative cursor-pointer hover:bg-[#383838] w-[308px] h-[44px] flex items-center rounded-[10px] bg-[#222222] py-[10px] px-[16px]">
                                <img src={spotifyLogo} className="h-[20px]" />
                                <div className="absolute inset-0 flex w-full items-center font-medium justify-center text-[14px] text-white">Continue with Spotify</div>
                            </div>
                            <div className="relative cursor-pointer hover:bg-[#383838] w-[308px] h-[44px] flex items-center rounded-[10px] bg-[#222222] py-[10px] px-[16px]">
                                <Mail className="size-[20px] text-[#bb86fc]" />
                                <div className="absolute inset-0 flex w-full items-center font-medium justify-center text-[14px] text-white">Continue with Google</div>
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
                            <a href="/login" className="underline text-[#bb86fc]">Log in</a>
                        </div>
                    </div>
                    <div className="w-[500px] h-[586px] pl-[36px] rounded-r-[16px]">

                    </div>
                </div>
            </div>
        </div>
    )
}