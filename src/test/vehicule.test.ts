import request from 'supertest';
import { describe, expect, test } from 'bun:test';

import type { CreateVehiculeInput } from '../features/vehicule/domain/vehicule.entity';
import { InMemoryVehiculeRepository } from '../features/vehicule/outbound/vehicule.adapter';
import { createApp } from '../app/app';
import { VehiculeService } from '../features/vehicule/domain/vehicule.service';
import type { UpdateVehiculeInput } from '../features/vehicule/domain/vehicule.entity';
import type { CreateUserInput } from '../features/users/domain/user.entity';


describe('API Vehicules ', () => {
    test('POST/ vehicules ajouter un vehicule ', async () => {
        const repository = new InMemoryVehiculeRepository();
        const app = createApp({ vehiculeService: new VehiculeService(repository) });

        const payload: CreateVehiculeInput = {
            veh_id: crypto.randomUUID(),
            veh_marque: 'TOYOTA',
            veh_categorie: 'ROUVNI',
            veh_anFabri: '1981',
            veh_couleur: 'Blanc',
            veh_carburant: 'Essence',
            veh_nmbrePlace: '6',
            veh_statut: 'loué',
            veh_prix: 850000,
            veh_photo: 'vehicule_rouvni.jpg',
            veh_description: 'BBG7',
        };

        const response = await request(app).post('/vehicules').send(payload);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Véhicule ajouté avec succès.');
        expect(response.body.data).toEqual(payload);

        const stored = await repository.findById(payload.veh_id);
        expect(stored).toEqual(payload);

    });

    test('GET/ Retourne la liste des véhicules enregistées ', async () => {
        const repository = new InMemoryVehiculeRepository();
        const app = createApp({ vehiculeService: new VehiculeService(repository) });

        const existingVehicules: CreateVehiculeInput[] = [
           {
             veh_id: crypto.randomUUID(),
             veh_marque: 'TOYOTA',
             veh_categorie: 'ROUVNI',
             veh_anFabri: '1981',
             veh_couleur: 'Blanc',
             veh_carburant: 'Essence',
             veh_nmbrePlace: '6',
             veh_statut: 'loué',
             veh_prix: 850000,
             veh_photo: 'vehicule_rouvni.jpg',
             veh_description: 'BBG7',
           },
           {
             veh_id: crypto.randomUUID(),
             veh_marque: 'RAV4',
             veh_categorie: 'JOUMI',
             veh_anFabri: '1980',
             veh_couleur: 'Rouge',
             veh_carburant: 'Essence',
             veh_nmbrePlace: '5',
             veh_statut: 'non loué',
             veh_prix: 900000,
             veh_photo: 'vehi08.jpg',
             veh_description: 'DOD02',
           }
        ];

        for (const vehicule of existingVehicules) {
            await repository.create(vehicule);
        }
        
        const response = await request(app).get('/vehicules');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(existingVehicules.length);
        expect(response.body).toEqual(existingVehicules);
    });

    test('PUT/vehicules Mettre à jour un véhicule', async ()  => {
        const repository = new InMemoryVehiculeRepository();
        const app = createApp({ vehiculeService: new VehiculeService(repository) });

        const existingVehicule: CreateVehiculeInput = {
            veh_id: crypto.randomUUID(),
            veh_marque: 'TOYOTA',
            veh_categorie: 'ROUVNI',
            veh_anFabri: '1981',
            veh_couleur: 'Blanc',
            veh_carburant: 'Essence',
            veh_nmbrePlace: '6',
            veh_statut: 'loué',
            veh_prix: 850000,
            veh_photo: 'vehicule_rouvni.jpg',
            veh_description: 'BBG7',
        };
        await repository.create(existingVehicule);

        const updatedVehicule: UpdateVehiculeInput = {
            veh_marque: 'TOYOTA',
            veh_categorie: 'ROUVNI',
            veh_anFabri: '1981',
            veh_couleur: 'Blanc',
            veh_carburant: 'Essence',
            veh_nmbrePlace: '6',
            veh_statut: 'loué',
            veh_prix: 800000,
            veh_photo: 'vehicule_rouvni.jpg',
            veh_description: 'BBG8',
        };
        const response = await request(app).put(`/vehicules/${existingVehicule.veh_id}`).send(updatedVehicule);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Le véhicule a été modifié avec succès.');

        const stored = await repository.findById(existingVehicule.veh_id);
        expect(stored).toEqual({ ...existingVehicule, ...updatedVehicule });

    });

    test('DELETE /vehicules supprime un véhicule', async () => {
        const repository = new InMemoryVehiculeRepository();
        const app = createApp({vehiculeService: new VehiculeService(repository)});

        const existingVehicule: CreateVehiculeInput = {
            veh_id: crypto.randomUUID(),
            veh_marque: 'TOYOTA',
            veh_categorie: 'ROUVNI',
            veh_anFabri: '1981',
            veh_couleur: 'Blanc',
            veh_carburant: 'Essence',
            veh_nmbrePlace: '6',
            veh_statut: 'loué',
            veh_prix: 850000,
            veh_photo: 'vehicule_rouvni.jpg',
            veh_description: 'BBG7',
        };
        const userAdmin: CreateUserInput = {
            user_id: crypto.randomUUID(),
            user_nom: 'Admin',
            user_prenom: 'Admin',
            user_email: 'admin@example.com',
            user_password: 'admin',
            user_role: 'admin',  
        };
        
        const admin = await request(app).post('/users').send(userAdmin);
        console.log(admin.body);
        const token = await request(app).post('/users/login').send({ user_email: userAdmin.user_email, user_password: userAdmin.user_password });
        console.log(token.body);
        await repository.create(existingVehicule);
        const response = await request(app).delete(`/vehicules/${existingVehicule.veh_id}`).set('Authorization', `Bearer ${token.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Le véhicule a été supprimé avec succès.');
        const stored = await repository.findById(existingVehicule.veh_id);
        expect(stored).toBeUndefined();

    });
});