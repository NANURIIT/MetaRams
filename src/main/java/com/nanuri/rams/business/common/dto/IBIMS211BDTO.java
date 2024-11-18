package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 IB승인담보기본 - 대출채권/채무보증 정보(TB06010S) - 담보/보증정보 Table.IBIMS211B DTO
*/
public class IBIMS211BDTO {
    private String         mrtgMngmNo;                                      // 담보관리번호
    private String         invJdgmDealNo;                                   // 투자심사딜번호
    private String         mrtgNm;                                          // 담보명
    private String         mrtgLclsCd;                                      // 담보대분류코드
    private String         mrtgMdclCd;                                      // 담보중분류코드
    private String         mrtgDtlUsgeCtns;                                 // 담보세부용도내용
    private String         mrtgCrryCd;                                      // 담보통화코드
    private BigDecimal     mrtgQnt;                                         // 담보수량
    private BigDecimal     mrtgUnpr;                                        // 담보단가
    private BigDecimal     mrtgAmt;                                         // 담보금액
    private BigDecimal     mrtgEvlAmt;                                      // 담보평가금액
    private BigDecimal     mrtgRto;                                         // 담보비율
    private String         mrtgEvlDt;                                       // 담보평가일자
    private String         rgstDt;                                          // 등록일자
    private String         mrtgStupDt;                                      // 담보설정일자
    private String         mrtgCclcDt;                                      // 담보해지일자
    private String         trOthrDscmNo;                                    // 거래상대방식별번호
    private String         trOthrNm;                                        // 거래상대방명
    private String         trEmpno;                                         // 거래사원코드
    private String         mrtgEvlStdrCd;                                   // 담보평가기준코드
    private String         prfdRankYn;                                      // 우선순위여부
    private String         hdwtEvlYn;                                       // 수기평가여부
    private String         mrtgOffrRcvnDcd;                                 // 담보제공수취구분코드
    private BigDecimal     avblMrtgPrc;                                     // 가용담보가격
    private String         mrtgStupKndCd;                                   // 담보설정종류코드
    private String         stupCrryCd;                                      // 설정통화코드
    private BigDecimal     stupTopAmt;                                      // 설정최고금액
    private BigDecimal     krwTrslStupTopAmt;                               // 원화환산설정최고금액
    private BigDecimal     cprnMrtgRto;                                     // 공동담보비율
    private BigDecimal     valtMrtgPrc;                                     // 유효담보가격
    private BigDecimal     krwTrslValtMrtgPrc;                              // 원화환산유효담보가격
    private String         delYn;                                           // 삭제여부
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}