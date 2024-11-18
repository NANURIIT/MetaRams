package com.nanuri.rams.com.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class LoggerAspect {
	
	@Around("execution(* com.nanuri.rams..*Controller.*(..)) or "
			+ "execution(* com.nanuri.rams..*Service.*(..)) or "
			+ "execution(* com.nanuri.rams..*Mapper.*(..))")
	public Object printLog(ProceedingJoinPoint joinPoint) throws Throwable {

		String type = "";
		String name = joinPoint.getSignature().getDeclaringTypeName();

		if (name.contains("Controller") == true) {
			type = "##### Controller ===> ";
		}

		if (name.contains("Service") == true) {
			type = "##### Service    ===> ";
		}

		if (name.contains("Mapper") == true) {
			type = "##### Mapper     ===> ";
		}

		log.debug(type + name + "." + joinPoint.getSignature().getName() + "()");

		// Object result = joinPoint.proceed();

		// log.debug("Result: " + result); // 쿼리 결과를 로그에 기록
		return joinPoint.proceed();
	}

}
