package com.licenta.bechefbackend.Thread;
import com.licenta.bechefbackend.DTO.StockItemDTO;
import com.licenta.bechefbackend.entities.Role;
import com.licenta.bechefbackend.entities.StockItem;
import com.licenta.bechefbackend.entities.StockList;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.StockItemRepository;
import com.licenta.bechefbackend.services.NotificationService;
import com.licenta.bechefbackend.services.StockListService;
import com.licenta.bechefbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.*;

@Service
public class CheckExpirationDate {
    private Timer timer;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired NotificationService notificationService;
    @Autowired
    StockListService stockListService;
    @Autowired
    StockItemRepository stockItemRepository;
    @Autowired
    UserService userService;
    @Autowired
    public CheckExpirationDate() {
        this.timer = new Timer();

    }

    public void start(){
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                List<User> users = userService.getAllUsers();
                Date currentDate = Calendar.getInstance().getTime();
                LocalDate localDate = LocalDate.now();
                for(User user : users)
                {
                    if(user.getRole() != Role.ADMIN){
                    StockList stockList = stockListService.getStockList(user.getId());
                    List<StockItem> stockItems = stockListService.getItemsByListId(stockList.getId());
                    for(StockItem stockItem : stockItems)
                    {
                        Date expirationDate = stockItem.getExpirationDate();
                        if(expirationDate != null){
                        int comparison = expirationDate.compareTo(currentDate);
                        if (!stockItem.getStatus().equals("expired")  && (comparison < 0 || comparison ==0)) {

                            notificationService.ingredientExpired(user.getId(), "expired",stockItem.getId());
                            System.out.println("S-a trimit notificarea");
                            stockItem.setStatus("expired");
                            stockItemRepository.save(stockItem);

                        } else if (comparison > 0) {
                            LocalDate expirationLocalDate = expirationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                            long daysUntilExpires = ChronoUnit.DAYS.between(localDate, expirationLocalDate);
                            if(daysUntilExpires <= 3)
                            {
                                notificationService.ingredientExpired(user.getId(), "Expires in " + daysUntilExpires + " days", stockItem.getId());
                                System.out.println("S-a trimit notificarea");
                            }
                        }
                    }}

                }}
            }
        };
        timer.scheduleAtFixedRate(task, 7 * 60 * 1000, 24 * 60 * 60 * 1000);
    }
    public void stop() {
        timer.cancel();
    }
}
