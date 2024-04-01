package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.CommentDTO;
import com.licenta.bechefbackend.entities.Comment;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.CommentRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RecipeRepository recipeRepository;
    public void postComment(CommentDTO comm)
    {
        try {
            User senderUser = userRepository.findById(comm.getSenderId()).orElse(null);
            User receiverUser = userRepository.findById(comm.getReceiverId()).orElse(null);
            Recipe recipe =  recipeRepository.findById(comm.getRecipeId()).orElse(null);
            if (senderUser!=null && receiverUser !=null && recipe!=null)
            {
                Comment comment = new Comment(comm.getComm(),senderUser,receiverUser,recipe);
                commentRepository.save(comment);
                Long comms;
                comms = recipe.getNrComments() + 1;
                recipeRepository.updateNrComments(comms,recipe.getId());
            }
            else {
                throw new IllegalStateException("Not found");
            }
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    public List<CommentDTO> findCommentsByRecipeId(Long recipeId) {
        List<Comment> comments = commentRepository.findAllByRecipeId(recipeId);
        List<CommentDTO> commentDTOS = new ArrayList<>();
        for (Comment c: comments)
        {
            CommentDTO commentDTO = new CommentDTO(c.getComm(),c.getSenderUser().getId(),c.getReceiverUser().getId(),c.getRecipe().getId());
            commentDTOS.add(commentDTO);
        }
        return commentDTOS;
    }
}
