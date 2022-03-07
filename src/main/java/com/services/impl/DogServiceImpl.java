package com.services.impl;

import com.dtos.DogDto;
import com.entities.Dog;
import com.repositories.DogRepository;
import com.services.DogService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("dogService")
public class DogServiceImpl implements DogService {

	private final DogRepository dogRepository;

    public DogServiceImpl(DogRepository dogRepository){
        this.dogRepository = dogRepository;
    }

    @Override
    public DogDto saveDog(DogDto dogDto) {
        // Converts the dto to the dog entity
        Dog dog = dogDtoToEntity(dogDto);
        // Save the dog entity
        dog = dogRepository.save(dog);
        // Return the new dto
        return dogEntityToDto(dog);
    }

    @Override
    public DogDto getDogById(Long dogId) {
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new EntityNotFoundException("Dog not found"));
        return dogEntityToDto(dog);
    }

    @Override
    public boolean deleteDog(Long dogId) {
        dogRepository.deleteById(dogId);
        return true;
    }

    @Override
    public List<DogDto> getAllDogs() {
        List<DogDto> dogDtos = new ArrayList<>();
        List<Dog> dogs = dogRepository.findAll();
        dogs.forEach(dog -> {
            dogDtos.add(dogEntityToDto(dog));
        });
        return dogDtos;
    }

    /**
     * Map dog dto to dog entity
     */
    private DogDto dogEntityToDto(Dog dog){
        DogDto dogDto = new DogDto();
        dogDto.setId(dog.getId());
        dogDto.setName(dog.getName());
        dogDto.setRace(dog.getRace());
        return dogDto;
    }

    /**
     * Map dog entity to dog dto
     */
    private Dog dogDtoToEntity(DogDto dogDto){
        Dog dog = new Dog();
        dog.setName(dogDto.getName());
        dog.setId(dogDto.getId());
        dog.setRace(dogDto.getRace());
        return dog;
    }
}
