import { Profile } from "src/app/models/proflie.model";
import { Pet } from "../../models/pet.model";

export class AddPet {
    static readonly type = "[PET] Add"
    constructor(public payload: Pet) {}
}

export class FetchPets {
    static readonly type = "[PET] FetchPets"
    constructor(public payload:any) {}
}

export class DeletePet {
    static readonly type = "[PET] Delete"
    constructor(public payload: string) {}
}

export class Login {
    static readonly type = "[PET] Login"
    constructor(public payload: Profile) {}
}

export class Logout {
    static readonly type = "[PET] Logout"
    constructor(public payload: undefined) {}
}

export class GetPet {
    static readonly type = "[PET] GetPet"
    constructor(public payload: string) {}
}