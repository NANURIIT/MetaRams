package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
딜승인LOC발행기본 Table.IBIMS224B DTO
*/
public class IBIMS224BDTO {
    
    private String         issMngmNo;                              // 발급관리번호
    private String         issSttsCd;                              // 발급상태코드
    private String         dealNo;                                 // 딜번호
    private String	       sn;                                     // 일련번호
    private String         empno;                                  // 사원번호
    private String         dprtCd;                                 // 부서코드
    private String         fndNm;                                  // 펀드명
    private String         prdtCd;                                 // 상품코드
    private String         ibPrdtClsfCd;                           // ib상품분류코드
    private String         issBdcd;                                // 발급부점코드
    private String         issCrryCd;                              // 발급통화코드
    private String         loiLocYn;                               // LOI/LOC여부
    private BigDecimal     stdrExrt;                               // 기준환율
    private String         issLtrDcd;                              // 발급서류구분코드
    private String         issTrOthrDscmNo;                        // 발급거래상대방식별번호
    private String         issDt;                                  // 발급일자
    private String         trOthrNm;                               // 거래상대방명
    private String         valtDt;                                 // 유효일자
    private String         rclmDt;                                 // 회수일자
    private BigDecimal     issAmt;                                 // 발급금액
    private String         issCtns;                                // 발급내용
    private String         issPclrCtns;                            // 발급특이내용
    private String         ivtgRqstCtns;                           // 발급요청내용
    private String         rclmRsnCtns;                            // 회수사유내용
    private String         rclmRsnDcd;                             // 회수사유구분코드
    private BigDecimal     rclmAmt;                                // 회수금액
    private BigDecimal     rclmSmmAmt;                             // 회수합계금액
    private String         ivtgCnfmYn;                             // 검토확인여부
    private String         smitOrgi;                               // 제출처
    private String         hanfDcmNo;                              // 하나포털문서번호
    private String         prgSttsCd;                              // 진행상태코드
    private String         sq1ApvlYn;                              // 1차승인여부
    private String         sq2ApvlYn;                              // 2차승인여부
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래id
    private String         guid;                                   // guid

}
