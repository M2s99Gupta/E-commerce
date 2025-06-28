package com.ecom.config;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ecom.model.UserDtls;

public class CustomUser implements UserDetails {

	
	

	private UserDtls user;
	
	public CustomUser(UserDtls user) {
		super();
		this.user = user;
	}
	
	

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().toUpperCase());
	    return Arrays.asList(authority);
	}

	@Override
	public String getPassword() {
		
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		
		return user.getEmail();
	}
	
//	@Override
//	public boolean isAccountNonLocked() {
//		
//		
//		return user.getAccountNonLocked();
//	}
	
	@Override
	public boolean isAccountNonLocked() {
	    Boolean locked = user.getAccountNonLocked();
	    return locked != null ? locked : true; // Defaults to true if null
	}

	
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	
	//to block the users
	
//	@Override 
//	public boolean isEnabled() {
//		return user.getIsEnable();
//	}
	
	@Override
	public boolean isEnabled() {
	    Boolean enabled = user.getIsEnable();
	    return enabled != null ? enabled : true; // default to true if null
	}

}
