package com.licenta.bechefbackend.socketIO;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class SocketIOConfig{

    @Bean
    public  SocketIOServer socketIOServer  () {
        Configuration configuration = new Configuration();
        configuration.setHostname("localhost");
        configuration.setPort(8082);
        return new SocketIOServer(configuration);
    }

}
