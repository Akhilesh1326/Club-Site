package com.example.auth.auth_service.CustomException;

public class UserAlreadyExistsException extends RuntimeException{
  public UserAlreadyExistsException(String message){
    super(message);
  }
}
