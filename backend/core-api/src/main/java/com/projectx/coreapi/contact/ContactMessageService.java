package com.projectx.coreapi.contact;

import com.projectx.coreapi.common.exception.ResourceNotFoundException;
import com.projectx.coreapi.contact.dto.ContactMessageRequest;
import com.projectx.coreapi.contact.dto.ContactMessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    @Transactional
    public ContactMessageResponse create(ContactMessageRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.name())
                .email(request.email())
                .interest(request.interest())
                .message(request.message())
                .handled(false)
                .build();
        return ContactMessageResponse.from(contactMessageRepository.save(message));
    }

    public Page<ContactMessageResponse> listForAdmin(Pageable pageable) {
        return contactMessageRepository.findAll(pageable).map(ContactMessageResponse::from);
    }

    @Transactional
    public ContactMessageResponse markHandled(UUID id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found: " + id));
        message.setHandled(true);
        return ContactMessageResponse.from(contactMessageRepository.save(message));
    }
}
