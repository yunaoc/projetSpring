package com.services;

import com.dtos.DogDto;

import java.util.List;

public interface DogService {
    /**
     * Sauve a dog
     */
    DogDto saveDog(DogDto dogDto);

    /**
     * Get a dog by it's id
     */
    DogDto getDogById(Long dogId);

    /**
     * Delete a dog by it's id
     */
    boolean deleteDog(Long dogId);

    /**
     * Get all the dogs
     */
    List<DogDto> getAllDogs();


}
