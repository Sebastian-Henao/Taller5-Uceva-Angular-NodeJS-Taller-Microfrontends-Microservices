import { Personaje, RolCategoria } from "../../domain/interfaces/personaje.interface";
import { faker } from '@faker-js/faker';

export class PersonajesService {
    private roles: RolCategoria[] = [
        'Vanguardia',
        'Ladron',
        'Jefe',
        'Ilusionista',
        'Explorador'
    ];

    public async getAllPersonajes(countPersonajes: number): Promise<Personaje[]> {
        const personajes: Promise<Personaje>[] = [];

        for (let i = 1; i <= countPersonajes; i++) {
            personajes.push(this.generatePersonaje(i));
        } 

        return Promise.all(personajes);
    }

    private generatePersonaje(id: number): Promise<Personaje> {
        return Promise.resolve({
            id,
            nombre: faker.person.fullName(),
            alias: faker.word.noun(),
            juego: faker.company.name(),
            habilidad: faker.commerce.productName(),
            rol: faker.helpers.arrayElement(this.roles),
        });
    }
}