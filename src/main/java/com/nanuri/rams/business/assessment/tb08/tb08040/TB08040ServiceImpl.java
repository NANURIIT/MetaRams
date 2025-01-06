package com.nanuri.rams.business.assessment.tb08.tb08040;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS348BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS348BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS420BMapper;
import com.nanuri.rams.business.common.vo.IBIMS348BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB08040ServiceImpl implements TB08040Service {

 	// @Autowired
 	// private EtprCrdtGrntAcctProc acctProc;
	/* 딜수수료스케줄기본 */
	private final IBIMS348BMapper ibims348Bmp;
	/* 딜거래내역 */
	private final IBIMS410BMapper ibims410Bmp;
	/* 딜수수료수납내역 */
	private final IBIMS420BMapper ibims420Bmp;
	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	// 수수료스케줄관리 조회
	@Override
	public List<IBIMS348BVO> srchFeeSch(IBIMS348BVO param) {
		String prdtCd = param.getPrdtCd(); // 종목코드
		

		List<IBIMS348BVO> outFeeSch = ibims348Bmp.selectFeeScxInfoList(param);

		return outFeeSch;
	};

	// 수수료스케줄관리 저장
	@Override
	public int saveFeeSch(IBIMS348BVO input) {

		int result = 0;

		List<IBIMS348BVO> feeSchList = input.getFeeSchList();
		String prdtCd = input.getPrdtCd();		 // 종목코드
		log.debug("prdtCd ::::: {}", prdtCd);
		String eno = facade.getDetails().getEno(); // 사원번호

		for (IBIMS348BVO ibims348bvo : feeSchList) {
			List<IBIMS348BVO> ibims348hvo = new ArrayList<>();
			// String rowType = ibims348bvo.getRowType();
			String rgstSttsCd = ibims348bvo.getRgstSttsCd(); // 등록상태여부
			String rowType = ibims348bvo.getRowType();	// row상태
			// if (rgstSttsCd == null) {
			// 	rgstSttsCd = "";
			// }

			switch (rowType) {
				case "I":  // "" 신규
					int newFeeSn = ibims348Bmp.getFeeSn(prdtCd);
					ibims348bvo.setPrdtCd(prdtCd);		// 종목코드
					ibims348bvo.setFeeSn(newFeeSn);		// 수수료일련번호
					ibims348bvo.setRgstSttsCd("1");	// 등록상태코드
					//ibims348bvo.setActsCd("0");	// 계정과목코드
					ibims348bvo.setPrcsCpltYn("N"); // 처리완료여부
					/* TODO */
					ibims348bvo.setFeeRcivDt("");	// 수수료수납일자
					ibims348bvo.setFeeRcivAmt(BigDecimal.ZERO);	// 수수료수납금액

					ibims348bvo.setMngmPrlnRto(BigDecimal.ZERO); // 관리이연이율
					ibims348bvo.setMngmRcogStrtDt(""); // 관리인식시작일자
					ibims348bvo.setMngmRcogEndDt(""); // 관리인식종료일자
					ibims348bvo.setMngmPrlnPrdDnum(0); // 관리이연기간일수
					ibims348bvo.setMngCnfmYn("N"); // 경영확인여부
					ibims348bvo.setInogCnfmYn("N"); // 출납확인여부
					ibims348bvo.setTaffCnfmYn("N"); // 세무확인여부
					ibims348bvo.setPymtFee(BigDecimal.ZERO); // 지급수수료
					ibims348bvo.setRqsRgstYn(""); // 신청등록여부
					// ibims348bvo.setExcSn(0); // 실행일련번호
					ibims348bvo.setDcRt(BigDecimal.ZERO); // 할인율
					ibims348bvo.setHndEmpno(eno);
					ibims348bvo.setHndTmnlNo(""); // 조작단말기번호
					ibims348bvo.setHndTrId(""); 	// 조작거래ID
					ibims348bvo.setGuid(""); 			// GUID

					result = ibims348Bmp.insertFeeSch(ibims348bvo);

					break;
				case "U": // 1. 수정
					ibims348bvo.setRgstSttsCd("1"); // 등록상태코드
					ibims348bvo.setHndEmpno(eno); // 조작사원번호
					ibims348bvo.setHndTmnlNo("");
					ibims348bvo.setHndTrId("");
					ibims348bvo.setGuid("");

					result = ibims348Bmp.updateFeeSch(ibims348bvo);
					break;

				case "D": // 2. 등록취소
					ibims348bvo.setRgstSttsCd("2"); // 등록상태코드
					ibims348bvo.setHndEmpno(eno); // 조작사원번호
					ibims348bvo.setHndTmnlNo("");
					ibims348bvo.setHndTrId("");
					ibims348bvo.setGuid("");

					result = ibims348Bmp.deleteFeeSch(ibims348bvo);
					break;

				default:
					break;
			}


		}

		return result;
	}
}
