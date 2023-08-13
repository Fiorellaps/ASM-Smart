declare module "*.css";
declare module "*.scss";
declare module "*.png" {
  const value: string;
  export default value;
}
