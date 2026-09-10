package com.projectx.coreapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * ProjectX Core Platform API.
 *
 * Owns auth, student accounts, course management, bookings, payments,
 * resume services, contact forms, blog and notifications. AI/LangGraph/RAG
 * functionality lives in the separate "ai-service" (FastAPI) - this service
 * only reserves the AI_SERVICE_URL configuration property for future use
 * and does not call it anywhere yet.
 */
@SpringBootApplication
@EnableCaching
public class CoreApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoreApiApplication.class, args);
    }
}
