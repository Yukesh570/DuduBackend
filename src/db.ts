import { AppDataSource } from "./data-source";


export async function initializeDB(){
    try{
    await AppDataSource.initialize()

    }
    catch(error){
        console.log("unable to load the database",error)
        process.exit
    }
}