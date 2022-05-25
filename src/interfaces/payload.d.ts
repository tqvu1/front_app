declare namespace Payload {
  export type Credentials = {
    email: string;
    password: string;
  };

  export type SignUp = {
    name: string;
    username: string;
    password: string;
  };

  export type ForgotPass = {
    email: string;
    lang: string;
  };

  export type VerifyOTP = {
    email: string;
    token: string;
  };

  export type ResetPass = {
    email: string;
    tokenPassword: string;
    password: string;
    rePassword: string;
  };

  export type PostFlgData = {
    seqno: string;
    postedFlg: string;
  };

  export type UpdatePostFlg = {
    rmOsirases: PostFlgData[];
  };

  export type DeleteNotificationSetting = {
    seqnos: number[];
  };
}
