import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Profile } from "src/app/models/proflie.model";
import { Pet } from "../../models/pet.model";
import { DeletePet, AddPet, Login, Logout, GetPet, FetchPets } from "../actions/actions";

export class StateModel {
    pets: Pet[] = []
    profile: Profile | undefined
}

@State<StateModel>({
    name: "pet",
    defaults:{
        pets: [],
        profile: undefined,
    }
})

export class PetState{
    @Selector()
    static getPets(state: StateModel){
        return state.pets
    }

    @Selector()
    static getProfile(state: StateModel){
        return state.profile
    }

    @Selector()
    static getPet(state: StateModel, id:string){
        let pet = undefined
        state.pets.forEach(element => {
            if(element.id === id) pet = element
        })
        return pet
    }

    @Action(AddPet)
    add({getState, patchState}: StateContext<StateModel>, {payload}: AddPet){
        const state = getState()
        patchState({
            pets: [...state.pets, payload]
        })
    }
    @Action(FetchPets)
    fetchPets({getState,patchState}: StateContext<StateModel>, payload: any){
        const state = getState()
        patchState({
            pets: payload
        })
    }

    @Action(DeletePet)
    remove({getState, patchState}: StateContext<StateModel>, {payload}: DeletePet){
        const state = getState()
        patchState({
            pets: state.pets.filter(pet => pet.id !== payload)
        })
    }
    @Action(Login)
    login({getState, patchState}: StateContext<StateModel>, {payload}: Login){
        const state = getState()
        patchState({
            profile: payload
        })
    }
    @Action(Logout)
    logout({getState, patchState}: StateContext<StateModel>, {payload}: Logout){
        const state = getState()
        patchState({
            profile: payload
        })
    }

    @Action(GetPet)
    getpet({getState, patchState}: StateContext<StateModel>, {payload}: GetPet){
        const state = getState()
        return state.pets[0]
    }
}