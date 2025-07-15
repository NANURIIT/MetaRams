package com.nanuri.rams.com.exception;

public class ValidationException extends RuntimeException {

    public enum Type {
        VALIDATION		,	// 입력값 오류
        BUSINESS		,   // 업무 로직 위반
        ERROR           ,  	// 일반 에러 (기타)
        AUTHORIZATION     	// 권한 없음
    }

    private final Type type;

    public ValidationException(Type type, String message) {
        super(message);
        this.type = type;
    }

    public Type getType() {
        return type;
    }
}