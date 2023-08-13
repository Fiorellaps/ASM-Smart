import { MemberUserEntityApi } from "./users.api-model";

export const getUsers = (id: string): Promise<MemberUserEntityApi> =>
  fetch(`https://api.github.com/users/${id}`).then((response) =>
    response.json()
  );
