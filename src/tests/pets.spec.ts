import { expect } from "chai";
import { AxiosResponse } from "axios";
import { PetsService } from "../services/PetsService.js";
import { PetInterface } from "../models/PetsModel.js";
import { getRandomInteger } from "../helper/utils.js";

describe("Pet CRUD operations", () => {
  let newPet: PetInterface;
  let addPetResponse: AxiosResponse<PetInterface>;
  const petsService = new PetsService();

  beforeEach(async () => {
    newPet = {
      id: getRandomInteger(1, 10),
      name: `dog-${Date.now()}`,
      category: { id: 0, name: "Dogs" },
      tags: [{ id: 1, name: "dogTag" }],
      status: "available",
      photoUrls: [],
    };
    addPetResponse = await petsService.addPet(newPet);
  });

  afterEach(async () => {
    try {
      await petsService.deletePet(newPet.id);
    } catch (error) {
      console.error(`Error deleting pet with ID ${newPet.id}:`, error);
    }
  });

  it("@regression should return pet details for pet with ID 10 and verify the name is 'doggie'", async () => {
    const response: AxiosResponse<PetInterface> = await petsService.getPet(newPet.id);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("name");
    expect(response.data.name).to.equal(newPet.name);
  });

  it(`@regression should find pets with available status`, async () => {
    const status: string = newPet.status;
    const response: AxiosResponse<PetInterface[]> = await petsService.getPetsByStatus(status);
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("array");
    expect(response.data.length).to.be.greaterThan(0);
    expect(response.data[0]).to.have.property("status");
    expect(response.data[0]?.status).to.equal(status);
  });

  it("@regression should find pets by tags and verify the response contains pets with the specified tag", async () => {
    const tag: string = newPet.tags[0]?.name ?? "";

    const response: AxiosResponse<PetInterface[]> = await petsService.getPetsByTags([tag]);
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("array");
    expect(response.data.some((pet) => pet.tags.some((t) => t.name === tag))).to.be.true;
  });

  it("@regression should add a new pet and verify the response contains the correct pet details", async () => {
    expect(addPetResponse.status).to.equal(200);
    expect(addPetResponse.data).to.include({ name: newPet.name, status: newPet.status });
    expect(addPetResponse.data).to.have.property("id");
  });

  it("@regression should update an existing pet and verify the updated details", async () => {
    const updatedPet = { ...newPet, name: "New dog name", status: "sold", tag: "dogTag" };
    const updatedResponse: AxiosResponse<PetInterface> = await petsService.putPet(updatedPet);
    expect(updatedResponse.status).to.equal(200);
    expect(updatedResponse.data.name).to.equal(updatedPet.name);
    expect(updatedResponse.data.status).to.equal(updatedPet.status);
  });

  it("@regression should delete a pet and verify it is no longer retrievable", async () => {
    const deleteResponse = await petsService.deletePet(newPet.id);
    expect(deleteResponse.status).to.equal(200);
    const getResponse = await petsService.getPet(newPet.id);
    expect(getResponse.status).to.equal(404);
  });
});

describe("Pet Service Error Handling", () => {
  const petsService = new PetsService();

  it("@regression should return 404 with error message when trying to get a non-existent pet", async () => {
    const nonExistentPetId = 99999;
    const response: AxiosResponse<any> = await petsService.getPet(nonExistentPetId);
    expect(response.status).to.equal(404);
    expect(response.data).to.include("Pet not found");
  });
});
