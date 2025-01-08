import OTPInputField from "@/components/OTPInputField";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Verify = async () => {
  if (!(await cookies()).get("otp-verify-session")) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <p className="text-md font-semibold text-blue-600">Enter otp received on your mail</p>
      <OTPInputField />
    </div>
  )
};

export default Verify;
