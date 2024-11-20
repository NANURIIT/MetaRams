package com.nanuri.rams.business.common.dto;

import com.nanuri.rams.business.common.vo.IBIMS116BVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@ToString
/*
 딜기본정보 Table.IBIMS101B DTO
*/
public class IBIMS101BDTO {
    
    private String         dealNo;            // 딜번호
    private String         sn;                // 일련번호
    private String         stdrYear;          // 기준년도
    private String         lastYn;            // 최종여부
    private String         rgstDt;            // 등록일자
    private String         decdDt;            // 결재일자
    private int            decdSn;            // 결재일련번호
    private String         delYn;             // 삭제여부
    private String         hndDetlDtm;        // 조작상세일시
    private String         hndEmpno;          // 조작사원번호

    /* 2023-12-04 추가된 컬럼 */
    private String         corptnTypCd;       // 협업유형코드
    private String         bookCd;            // 북코드
    private String         invPrdtDtlsDvdCd;  // 투자상품상세분류코드
    private String         bnkBd;             // 은행부점
    private String         invstCty;          // 투자도시
    private String         bzsacalCd;         // 기업규모코드
    private String         indTypDvdCd;       // 업종분류코드
    private String         irls;              // 계열
    private String         crdtGrdCd;         // 신용등급코드
    private String         lstMkt;            // 상장시장
    private String         csucCmpDscmNo;     // 시공사식별번호
    private String         crdtEhcmntCcd;     // 신용보감구분코드
    private BigDecimal     ltv;               // LTV
    private String         ovrsCorpCoprtnCd;  // 해외법인협업
    private String         etcCntn;           // 기타의견

    /* KEEP */
    private String         busiDetlDcd;       // 사업상세구분코드
    private String         lstYn;             // 상장여부
    private String         pplcFndYn;         // 사모펀드여부
    private String         untpFndYn;         // 단위형펀드여부
    private String         hndTmnlNo;         // 조작단말기번호
    private String         hndTrId;           // 조작거래id
    private String         guid;              // guid
    private String         inqDvsn;           // TB03040S 사업정보조회 기준일자 구분
    private String         start;             // TB03040S 사업정보조회 시작일
    private String         end;               // TB03040S 사업정보조회 종료일

    /* 기본정보 */
    private String         dealNm;            // 딜명
    private String         prdtIflwPathDcd;   // 상품유입경로구분코드
    private String         invDealCntn;       // 딜내용
    private String         invTrgtDcd;        // 투자대상구분코드
    private String         invTpDcd;          // 투자유형구분코드
    private String         invShpCd;          // 투자형태코드
    private String         invWyCd;           // 투자방식코드
    private String         busiDcd;           // 사업구분코드
    private String         busiDcdNm;         // 사업구분코드명
    private String         ntnCd;             // 국가코드
    private String         dmsCrdtGrdDcd;     // 국내신용등급구분코드
    private String         crdtInqDt;         // 신용조회일자
    private String         ptxtTrOthrDscmNo;  // 거래상대방식별번호
    private String         ptxtTrOthrDscmNm;  // 거래상대방식별명

    /* 자산분류 */
    private String         invPrdtLclsCd;     // 투자상품대분류코드
    private String         invPrdtMdclCd;     // 투자상품중분류코드
    private String         invPrdtClsfCd;     // 투자상품분류코드
    private String         ibPrdtClsfCd;      // ib상품분류코드
    private String         actsCd;            // 계정과목코드
    private String         ortnFndCd;         // 운용펀드코드
    private String         dskCd;             // 데스크코드
    private String         holdPrpsDcd;       // 보유목적구분코드
    private String         offrSrvcDcd;       // 제공서비스구분코드
    private String         thcoRlDcd;         // 당사역할구분코드
    private BigDecimal     invPrdMnum;        // 투자기간개월수
    private String         socYn;             // soc여부
    private String         socDcd;            // soc구분코드
    private String         sppiSfcYn;         // sppi충족여부
    private String         mrtgStupYn;        // 담보설정여부
    private String         altnInvYn;         // 대체투자여부
    private String         rlesFnnYn;         // 부동산금융여부
    private String         rlesFnnDetlDcd;    // 부동산금융상세구분코드
    private String         projFnnYn;         // 프로젝트금융여부
    private String         crdtRifcAplyYn;    // 신용보강적용여부

    /* 수익정보 */
    private String         invAmtDcsnYn;      // 투자금액확정여부
    private BigDecimal     allInvAmt;         // 총투자금액
    private String         thcoPtciAmtDcsnYn; // 당사참여금액확정여부
    private BigDecimal     thcoPtciAmt;       // 당사참여금액
    private BigDecimal     allErnAmt;         // 전체수익금액
    private BigDecimal     theYearErnAmt;     // 당해수익금액
    private BigDecimal     baltErnAmt;        // 기표수익금액
    private BigDecimal     intrErnAmt;        // 이자수익금액
    private String         crryCd;            // 통화코드
    private BigDecimal     crryAmt;           // 통화금액
    private String         baltDt;            // 기표일자
    private String         expDt;             // 만기일자

    /* 직원정보 */
    private String         chrrEmpno;         // 담당자사원번호
    private String         chrrEmpnm;         // 담당자사원명
    private String         mngmBdcd;          // 관리부점코드
    private String         mngmBdcdNm;        // 관리부점명
    private String         dcfcEmpNo;         // 결재자사원번호
    private String         dcfcBdcd;          // 결재자부점코드

    /* IBIMS103B 진행상태 */
    private String         mtrPrgSttsDcd;     // 안건진행상태코드
    private String         mtrPrgSttsDcdNm;   // 안건진행상태코드명

    private String         wfId;              // 워크플로우ID
    private String         wfState;           // 워크플로우 상태
    private String         rtnYn;             // 반송여부

    /* 공동영업관리자/협업부서 정보 */
    private List<IBIMS116BVO> enoPList;      // 공동영업관리자 목록

}