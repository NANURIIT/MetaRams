package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS211BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * IB승인담보기본 - 대출채권/채무보증 정보(TB06010S) - 담보/보증정보 Table.IBIMS211B VO
 */
public class IBIMS211BVO extends IBIMS211BDTO {
	// IBIMS214B
    private String         drcMrtgYn;                                       // 직접담보여부
    private String         ovssMrtgYn;                                      // 국외담보여부
    private String         aprsMthCd;                                       // 감정방법코드(감정구분코드)
    private String         aprsEvlIsttCd;                                   // 감정평가기관코드
    private String         crevIsttNm;                                      // 시가평가기관명
    private String         crevStdrCd;                                      // 시가평가기준코드
    private String         aprsPrpsCd;                                      // 감정목적코드
    private String         aprsDt;                                          // 감정일자
    private String         lctpAddr;                                        // 소재지주소
    private String         rlesSqmsCtns;                                    // 부동산면적내용
    private String         aprsCrryCd;                                      // 감정통화코드
    private BigDecimal     aprsPrc;                                         // 감정가격
    private BigDecimal     krwTrslAprsPrc;                                  // 원화환산감정가격
    private BigDecimal     mrtgRcgRto;                                      // 담보인정비율
    private BigDecimal     mrtgPrc;                                         // 담보가격
    // IBIMS215B
    private String         mrtgCtns;                                        // 담보내용
    private String         mvppMrtgKndCd;                                   // 동산담보종류코드
    private String         opprPrsmFdtnCtns;                                // 시가추정근거내용
    private String         mrtgAcqMthCd;                                    // 담보취득방법코드
    // IBIMS216B
    private String         grteCtrcDcd;                                     // 보증약정구분코드
    private String         grnrCpin;                                        // 보증인고객식별번호
    private String         grupItgrCrdtGrdDcd;                              // 그룹통합신용등급구분코드
    private String         crdtInqDt;                                       // 신용조회일자
    private String         dbtrCpin;                                        // 채무자고객식별번호
    private String         grteDbtrRltnDcd;                                 // 보증채무자관계구분코드
    private BigDecimal     grteAmt;                                         // 보증금액
    private BigDecimal     grtePrna;                                        // 보증원금
    private String         grteCrryCd;                                      // 보증통화코드
    private String         stlaOrznBlngDcd;                                 // 결산기구분코드
    private String         grteStlaDe;                                      // 보증결산일
    private String         grteStlaDeEtcDcd;                                // 보증결산일기타구분코드
    private String         mrtgGrteCtns;                                    // 담보보증내용
    // IBIMS217B
    private String         grteIsttDcd;                                     // 보증기관구분코드
    private String         grteIsttCd;                                      // 보증기관코드
    private String         grteIsttNm;                                      // 보증기관명
    private String         lgrteNm;                                         // 보증서명
    private String         grteExprDt;                                      // 보증만료일자
    // IBIMS218B
    private String         etcMrtgTpCd;                                     // 기타담보유형코드
    private String         etcMrtgKndCd;                                    // 기타담보종류코드
    private String         mrtgCdCtns;                                      // 담보코드내용
    private String         etcMrtgGrdCtns;                                  // 기타담보등급내용
    private String         etcMrtgAcqMthCd;                                 // 기타담보취득방법코드
    // IBIMS219B
    private String         ovssEvlIsttYn;                                   // 국외평가기관여부
    private String         rlthMrtgKndCd;                                   // 실물담보종류코드
    private String         aprsStdrCd;                                      // 감정기준코드
}