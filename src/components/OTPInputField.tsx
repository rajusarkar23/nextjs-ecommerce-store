"use client";
import { useState } from "react";
import { Button, InputOtp, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function OTPInputField() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [getResponse, setGetResponse] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    try {
      setGetResponse(true);
      setError(false);
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: value }),
      });
      const response = await res.json();

      if (response.error === false) {
        setGetResponse(false);
        router.push("/cart");
      } else {
        setError(true);
        setGetResponse(false);
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <InputOtp length={6} value={value} onValueChange={setValue} />
      <div className="flex gap-2 flex-col">
        {getResponse ? (
          <Button isDisabled color="default" className="w-32">
            Wait...
            <Spinner color="primary" size="sm" />
          </Button>
        ) : (
          <Button
            onPress={handleClick}
            color="primary"
            type="submit"
            variant="ghost"
            className="w-32 font-semibold"
          >
            Verify
          </Button>
        )}
        <div className="text-center font-bold text-red-500">{error ? <p className="flex"><X />{errorMessage}</p> : <p></p>}</div>
      </div>
    </div>
  );
}
