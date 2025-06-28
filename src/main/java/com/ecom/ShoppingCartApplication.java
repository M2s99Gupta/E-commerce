package com.ecom;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ecom.model.UserDtls;
import com.ecom.repository.UserRepository;

@SpringBootApplication
public class ShoppingCartApplication implements CommandLineRunner{
	
	private final Logger LOG = LoggerFactory.getLogger(ShoppingCartApplication.class);

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ShoppingCartApplication.class, args);
	}
	
	public void run(String... args) throws Exception {

		UserDtls admin = this.userRepository.findByEmailAndRole("mkumarg497@gmail.com", "ROLE_ADMIN");

		if (admin == null) {

			LOG.error("Admin not found!!!");
			UserDtls user = new UserDtls();
			user.setEmail("mkumarg497@gmail.com");
			String encodedPassword = passwordEncoder.encode("*************");
			user.setPassword(encodedPassword);
			user.setRole("ROLE_ADMIN");
			user.setAccountNonLocked(true);

			this.userRepository.save(user);
			LOG.error("Created Default Demo Admin!!!");

		}

	}

}
