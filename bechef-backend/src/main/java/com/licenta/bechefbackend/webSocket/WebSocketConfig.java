package com.licenta.bechefbackend.webSocket;
import com.licenta.bechefbackend.services.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@AllArgsConstructor
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig   implements WebSocketMessageBrokerConfigurer  {
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*")
                .withSockJS();
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry)
    {
        registry.setApplicationDestinationPrefixes("/app","/user");
        registry.enableSimpleBroker("/newMessage","/newNotification","/changedStatus",
                "/updateList","/editingList","/stopEditingList");
    }

//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(new ChannelInterceptor() {
//            @Override
//            public Message<?> preSend(Message<?> message, MessageChannel channel) {
//                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
//                    String token = accessor.getFirstNativeHeader("token");
//                    if (token == null || !validateToken(token)) {
//                        throw new SecurityException("Token-ul JWT invalid!");
//                    }
//                }
//                return message;
//            }
//        });
//    }
//    private boolean validateToken(String token) {
//        final String jwt = token;
//        final String userEmail;
//        userEmail = jwtService.extractUserName(jwt);
//        if(!org.apache.commons.lang3.StringUtils.isEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null)
//        {
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
//            if (jwtService.isTokenValid(jwt, userDetails)){
//                return true;
//            }
//        }
//        return false;
//    }

}
