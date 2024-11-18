package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 IB승인기초자산기본 - 대출채권/채무보증 정보(TB06010S) - 기초자산 Table.IBIMS222B DTO
*/
public class IBIMS222BDTO {
    private String         bssAsstMngmNo;                                   // 기초자산관리번호
    private String         bssAsstNm;                                       // 기초자산명
    private String         invJdgmDealNo;                                   // 투자심사딜번호
    private String         trOthrDscmNo;                                    // 거래상대방식별번호
    private String         trOthrNm;                                        // 거래상대방명
    private String         crno;                                            // 법인등록번호
    private String         eprzSclDcd;                                      // 기업규모구분코드
    private String         stsStnIdstClsfCd;                                // 통계청표준산업분류코드
    private String         crdtGrdDcd;                                      // 신용등급구분코드
    private String         invNtnCd;                                        // 투자국가코드
    private String         bssAsstInvShpDcd;                                // 기초자산투자형태구분코드
    private String         bssAsstTpCd;                                     // 기초자산유형코드
    private String         bssAsstDetlTpDcd;                                // 기초자산상세유형구분코드
    private String         rgstDt;                                          // 등록일자
    private String         rgstEmpno;                                       // 등록사원번호
    private String         rlesTpDcd;                                       // 부동산유형구분코드
    private String         invLctpDcd;                                      // 투자소재지구분코드
    private String         lctpAddr;                                        // 소재지주소
    private String         ltvOutputMthDcd;                                 // ltv산출방법구분코드
    private BigDecimal     ltvRto;                                          // ltv비율
    private String         pfEfceShpDcd;                                    // pf시행형태구분코드
    private String         unsldMngmAreaYn;                                 // 미분양관리지역여부
    private String         qlfcIpreYn;                                      // 적격ipre여부
    private String         qlfcHvcreYn;                                     // 적격hvcre여부
    private String         lqdzSctyNm;                                      // 유동화증권명
    private String         moNsFndCd;                                       // 모고유자산펀드코드
    private String         fofsYn;                                          // 재간접펀드여부
    private String         bdfndYn;                                         // 블라인드펀드여부
    private String         reitsYn;                                         // 리츠여부
    private String         moFndYn;                                         // 모펀드여부
    private String         nusLmtYn;                                        // 미사용한도여부
    private String         cptlMktLawAplyTrgtYn;                            // 자본시장법적용대상여부
    private String         pefYn;                                           // pef여부
    private String         bssAsstIsuCrno;                                  // 기초자산발행법인등록번호
    private String         pbffPplcDcd;                                     // 공모사모구분코드
    private String         dmsOvrsFndDcd;                                   // 국내해외펀드구분코드
    private String         kofiaFndCd;                                      // 금융투자협회펀드코드
    private String         ksdFndCd;                                        // 한국예탁결제원펀드코드
    private String         lei;                                             // 글로벌법인식별번호
    private String         fndMngmBdNo;                                     // 펀드관리부점번호
    private String         fndRwaClcMthDcd;                                 // 펀드rwa계산방법구분코드
    private BigDecimal     rltnCmpAcbkAmt;                                  // 관계회사장부금액
    private BigDecimal     krwTrslRltnCmpAcbkAmt;                           // 원화환산관계회사장부금액
    private BigDecimal     lvrgRto;                                         // 레버리지비율
    private BigDecimal     fndAcctPrdMnum;                                  // 펀드회계기간개월수
    private String         rlthTpDcd;                                       // 실물유형구분코드
    private String         rlthNm;                                          // 실물명
    private BigDecimal     ernRt;                                           // 수익율
    private BigDecimal     ernPrdMnum;                                      // 수익기간개월수
    private String         delYn;                                           // 삭제여부
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}