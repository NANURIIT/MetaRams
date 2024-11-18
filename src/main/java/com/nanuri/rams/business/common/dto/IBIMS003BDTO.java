package com.nanuri.rams.business.common.dto;

import com.nanuri.rams.com.code.AthCd;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
/*
 사원기본 Table.IBIMS003B DTO
*/
public class IBIMS003BDTO {
    private String         empno;                                  // 사원번호
    private String         empNm;                                  // 사원명
    private AthCd          athCd;                                  // 권한코드
    private String         usrDcd;                                 // 사용자구분코드
    private String         engEmpNm;                               // 영문사원명
    private String         cpin;                                   // 고객식별번호
    private String         brdt;                                   // 생년월일
    private String         rnmCnfmNo;                              // 실명확인번호
    private String         empSttsDcd;                             // 사원상태구분코드
    private String         pwd;                                    // 비밀번호
    private String         lginPwd;                                // 로그인비밀번호
    private String         aplyStrtDt;                             // 적용시작일자
    private String         aplyEndDt;                              // 적용종료일자
    private String         rgstRsn;                                // 등록사유
    private String         rgstEmpno;                              // 등록사원번호
    private String         rgstDt;                                 // 등록일자
    private String         pwdChngDt;                              // 비밀번호변경일자
    private String         lginPwdChngDt;                          // 로그인비밀번호변경일자
    private BigDecimal     pwdErrNbtm;                             // 비밀번호오류횟수
    private BigDecimal     lginPwdErrNbtm;                         // 로그인비밀번호오류횟수
    private BigDecimal     odsPwdErrNbtm;                          // ODS비밀번호오류횟수
    private String         dprtCd;                                 // 부서코드
    private String         dprtNm;                                 // 부서명
    private String         bdCd;                                   // 소속부점코드
    private String         bdNm;                                   // 소속부점명
    private String         opstDcd;                                // 직위구분코드
    private String         clspDcd;                                // 직급구분코드
    private String         jbgpDcd;                                // 직군구분코드
    private String         osdtDcd;                                // 직책구분코드
    private String         dtyDcd;                                 // 직무구분코드
    private String         empDcd;                                 // 사원구분코드
    private String         ecnyDt;                                 // 입사일자
    private String         rtrmDt;                                 // 퇴직일자
    private String         gnfdDt;                                 // 발령일자
    private String         atno;                                   // 전화지역번호
    private String         tlno;                                   // 전화번호
    private String         ptblTlno;                               // 휴대전화번호
    private String         wncpTlno;                               // 사내전화번호
    private String         emlAddr;                                // 이메일주소
    private String         dy90CnnYn;                              // 90일접속여부
    private String         cnnPmssYn;                              // 접속허용여부
    private String         delYn;                                  // 삭제여부
    private String         delEmpno;                               // 삭제사원번호
    private String         hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID

    private Boolean        isLocked;
}