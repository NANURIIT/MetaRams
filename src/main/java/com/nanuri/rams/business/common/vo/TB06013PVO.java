package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS213BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class TB06013PVO {
	private String         prdtCd;                 		                    // 상품코드
	// IBIMS211B
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
    private String         trEmpno;                                         // 거래부점코드
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
    
    private String         mrtgLclsNm;                                      // 담보대분류코드명
    private String         mrtgMdclNm;                                      // 담보중분류코드명
    private String         mrtgEvlStdrNm;                                   // 담보평가기준코드명
    private String         mrtgStupKndNm;                                   // 담보설정종류코드명
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

    /* 우선순위정보 */
    private List<IBIMS213BDTO> prfdRankList;                            // IBIMS115BDTO
}
