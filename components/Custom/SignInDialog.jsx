import React, { useContext } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailContext } from '@/app/context/UserDetailsContext';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuid4 } from 'uuid';

function SignInDialog({ openDialog, closeDialog }) {
  const { setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } },
        );

        const user = userInfo.data;
        // console.log("Google User Info:", user);

        await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4(),
        });

        if(typeof window !== "undefined") {
          localStorage.setItem('user', JSON.stringify(user));
        }

        setUserDetail(user);

        closeDialog(false);
      } catch (error) {
        console.error("Google login error:", error);
      }
    },
    onError: errorResponse => console.error("Google login failed:", errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>

          {/* Use asChild to avoid <p> wrapping <div> */}
          <DialogDescription asChild>
            <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground text-sm">
              <h2 className="font-bold text-2xl text-center text-white">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="mt-2 text-center text-lg">
                {Lookup.SIGNIN_SUBHEADING}
              </p>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-500 mt-3"
                onClick={googleLogin}
              >
                Sign In With Google
              </Button>
              <p>{Lookup?.SIGNIN_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;