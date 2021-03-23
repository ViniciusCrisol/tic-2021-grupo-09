export default interface ICreateAccountDTO {
  name: string;
  email: string;
  password_hash: string;
  account_name: string;
  account_main_thing_id: string;
  account_business_role_id: string;
}
