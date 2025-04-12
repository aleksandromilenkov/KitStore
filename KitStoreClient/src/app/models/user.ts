export type User = {
    email: string;
    userName: string;
    roles: {id:number, values: string[]};
    pictureUrl?: string;
    token: string;
  };
  
  export type Address = {
    name: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  