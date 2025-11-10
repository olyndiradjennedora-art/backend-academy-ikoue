import request from 'supertest';
import {describe, expect, test} from 'bun:test';
import type { CreateLocationInput } from '../features/location/domain/location.entity';
import { InMemoryLocationRepository } from '../features/location/outbound/location.adapter';
import { createApp } from '../app/app';
import { LocationService } from '../features/location/domain/location.service';
import type { UpdateLocationInput } from '../features/location/domain/location.entity';
import type { CreateUserInput } from '../features/users/domain/user.entity';

describe('API/Locations', () => {

});