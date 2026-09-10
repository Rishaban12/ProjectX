package com.projectx.coreapi.contact;

import com.projectx.coreapi.contact.dto.ContactMessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/contact-messages")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ContactMessageAdminController {

    private final ContactMessageService contactMessageService;

    @GetMapping
    public Page<ContactMessageResponse> list(Pageable pageable) {
        return contactMessageService.listForAdmin(pageable);
    }

    @PatchMapping("/{id}/handled")
    public ContactMessageResponse markHandled(@PathVariable UUID id) {
        return contactMessageService.markHandled(id);
    }
}
