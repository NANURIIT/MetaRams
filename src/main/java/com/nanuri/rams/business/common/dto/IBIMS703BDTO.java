package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
/*
 금융감독원보고자료관리 CPC3 보고서 양식 DTO
*/
public class IBIMS703BDTO {

    private int rownum;                                 // 항목
    private String stdrYm;                              // 기준년월
    private String dprtCd;                              // 부점코드
    private int rgstSn;                                 // 등록일련번호
    private String rptsIemMngmNo;                       // 보고서항목관리번호
    private String cmpNm;                               // 회사명
    private String fssCmpCd;                            // 금융감독원회사코드
    private String wrtnStdrDt;                          // 작성기준일자
    private String etcRptsInvShpCd;                     // 기타보고서투자형태코드
    private String etcRptsInvDetlCd;                    // 기타보고서투자상세코드
    private String pfThcsDcd;                           // PF해당구분코드
    private String socThcsDcd;                          // SOC해당구분코드
    private String invDt;                               // 투자일자
    private String ctrtEndDt;                           // 계약종료일자
    private String rlesTpDcd;                           // 부동산유형구분코드
    private String pfSlltTpDcd;                         // PF분양유형구분코드
    private String pfErnTpDcd;                          // PF수익유형구분코드
    private String bssAsstLctpDcd;                      // 기초자산소재지구분코드
    private String ntnNm;                               // 국가명
    private String ovrsLctCtyNm;                        // 해외소재도시명
    private String rlesLctpZpcd;                        // 부동산소재지우편번호
    private String fndNm;                               // 펀드명
    private String kofiaFndCd;                          // 금융투자협회펀드코드
    private String asstMgcoNm;                          // 자산운용사명
    private String fofsThcsDcd;                         // 재간접펀드해당구분코드
    private String bdfndThcsDcd;                        // 블라인드펀드해당구분코드
    private int fndInvAmt;                              // 펀드투자금액
    private int fndTotEvlAmt;                           // 펀드총평가금액
    private String fndEtcRptsPbffPplcDcd;               // 펀드기타보고서공모사모구분코드
    private String fndEtcRptsCrryCd;                    // 펀드기타보고서통화코드
    private String reitsNm;                             // 리츠명
    private int reitsAmt;                               // 리츠금액
    private int reitsEvlAmt;                            // 리츠평가금액
    private String reitsEtcRptsPbffPplcDcd;             // 리츠기타보고서공모사모구분코드
    private String reitsEtcRptsCrryCd;                  // 리츠기타보고서통화코드
    private String lqdzSctyNm;                          // 유동화증권명
    private String lqdzSctyKndCd;                       // 유동화증권종류코드
    private String lqdzSctyIsuIsttNm;                   // 유동화증권발행기관명
    private String lqdzSctyCrno;                        // 유동화증권법인등록번호
    private String isuDt;                               // 발행일자
    private int parAmt;                                 // 액면금액
    private int lqdzSctyIsuIntrt;                       // 유동화증권발행금리
    private String crdtRifcCmpNm;                       // 신용보강회사명
    private String crdtRifcCmpCrno;                     // 신용보강회사법인등록번호
    private String rptsCtrtTpCd;                        // 보고서계약유형코드
    private String sq1EtcRptsCrdtGrdCd;                 // 1차기타보고서신용등급코드
    private String sq2EtcRptsCrdtGrdCd;                 // 2차기타보고서신용등급코드
    private String etcCtrtNm;                           // 기타계약명
    private String trOthrNm;                            // 거래상대방명
    private int invPrna;                                // 투자원금
    private int etcEvlAmt;                              // 기타평가금액
    private int ncrRskVl;                               // NCR위험값
    private int ncrRskAmt;                              // NCR위험금액
    private String jobChrrNm;                           // 업무담당자명
    private String dptNm;                               // 부서명
    private String cplcCtns;                            // 연락처내용
    private Date hndDetlDtm;                            // 조작상세일시
    private String hndEmpno;                            // 조작사원번호
    private String hndTmnlNo;                           // 조작단말기번호
    private String hndTrId;                             // 조작거래ID
    private String guid;                                // GUID

}
