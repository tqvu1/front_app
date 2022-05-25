declare namespace Response {
  export type Error = {
    code: string;
    field: string;
    message: string;
    status: string;
  };

  export type SignUpData = {
    data: {
      access_token: string;
      token_type: string;
      expires_at: string;
    };
  };

  export type SignInData = {
    accessToken: string;
  };

  export type Me = {
    item: { name: string; email: string };
  };

  export type Image = {
    fileable_id: number;
    id: number;
    mime_type: string;
    path: string;
    size: number;
  };

  export type NotificationSetting = {
    total: number;
    page: number;
    offset: number;
    items: NotificationEntity[];
  };

  export type NotificationEntity = {
    seqno: number;
    postedFrom: string;
    postedTo: string;
    rmOsiraseContent: {
      gengoCd: string;
      seqno: number;
      title: string;
    };
    rmWebUser: {
      smei: string;
    };
    postedFlg: string;
    hyoujiBasho: string;
  };

  export type Logo = {
    item: {
      netSbsName: string;
      ecsiteLogoDir: string;
    };
  };

  export type NameLogin = {
    item: { name: string };
  };

  export type LanguagesEntity = {
    gengoCd: string;
    gengoNm: string;
  };

  export type ListLanguage = {
    items: LanguagesEntity[];
  };

  export type ForgotPass = {
    message: string;
    code: string;
    field: string;
    status: number;
  };

  export type VerifyOTP = {
    message: string;
    code: string;
    field: string;
    status: number;
  };

  export type ResetPass = {
    message: string;
    code: string;
    field: string;
    status: number;
  };

  export type InternalPICItem = {
    title: string;
    email: string;
  };

  export type InternalPIC = {
    items: InternalPICItem[];
  };
}
