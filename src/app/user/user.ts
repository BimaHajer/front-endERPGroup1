
export class User {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phone?: string,
    public password?: string,
    public picture?: string,
    public address?: string,
    public zipCode?: string,
    public roleId?: Role,
    public token?: string | null,
    public active?: boolean,
    public createdAt?: string,
    public updatedAt?: string,
    public createdBy?: number,
    public updatedBy?: number,

  ) { }
}

export class Role 
{
 public id?: number 
 public name?: string | null; 
 public  level?: string | null;
 public active?: boolean | false; 
 public createdAt?: Date | null; 
 public createdBy?: number | null; 
 public updatedAt?: Date | null; 
 public updatedBy?: number | null; 
 public  deletedAt?: Date | null; 

  } 
