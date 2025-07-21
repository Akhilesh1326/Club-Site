package com.example.auth.auth_service.Controller;

import com.example.auth.auth_service.DTO.UserInfoDTO;
import com.example.auth.auth_service.Repo.AuthUserRepository;
import com.example.auth.auth_service.Service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@CrossOrigin
@RequestMapping("/api/internal-auth-service")
public class InternalCommunicationController {

    @Autowired
    private AuthUserService authUserService;
    @Autowired
    private AuthUserRepository authUserRepository;

    @GetMapping("internal-greet")
    public String greet(){
        return "hello";
    }


    @PostMapping("/get-users")
    public List<UserInfoDTO> getUserInBulk(@RequestBody List<UUID> Members) {
        System.out.println("Hello from get");

        List<UserInfoDTO> users = authUserService.getUserDetailsByIds(Members);
        System.out.println(users);
        return users;

    }

//    @PutMapping("/update-role")
//    public updateRole(@RequestBody UUID userId){
//
//    }

}
