package com.nanuri.rams.business.assessment.tb06.tb06010;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.assessment.tb04.tb04010.TB04010Service;
import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import com.nanuri.rams.business.common.dto.IBIMS202BDTO;
import com.nanuri.rams.business.common.dto.IBIMS205BDTO;
import com.nanuri.rams.business.common.dto.IBIMS208BDTO;
import com.nanuri.rams.business.common.dto.IBIMS209BDTO;
import com.nanuri.rams.business.common.vo.IBIMS112BVO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS205BVO;
import com.nanuri.rams.business.common.vo.IBIMS208BVO;
import com.nanuri.rams.business.common.vo.IBIMS209BVO;
import com.nanuri.rams.business.common.vo.IBIMS220BVO;
import com.nanuri.rams.business.common.vo.IBIMS220BVO2;
import com.nanuri.rams.business.common.vo.TB06010SVO;
import com.nanuri.rams.business.common.vo.TB06013PVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06010S")
@RequiredArgsConstructor
@RestController
public class TB06010APIController {

	private final TB06010Service tb06010Service;
	private final TB04010Service tb04010Service;

	// 대출계약 승인정보관리 조회
	@GetMapping(value = "/getCnfrncDealInfo")
	public TB06010SVO getCnfrncDealInfo(TB06010SVO param) {
		return tb06010Service.getCnfrncDealInfo(param);
	}

	// 종목정보 등록
	@PostMapping(value = "/regPrdtCd")
	public int regPrdtCd(IBIMS201BVO param) {
		return tb06010Service.regPrdtCd(param);
	}
	
	// 종목정보 삭제
	@PostMapping(value = "/deletePrdtCd")
	public int deletePrdtCd(@RequestBody IBIMS201BVO param) {
		return tb06010Service.deletePrdtCd(param);
	}

	/**********************************/

	// 상환구분/금리정보 조회
	@GetMapping(value = "/selectIBIMS202BDTOInfo")
	public IBIMS202BDTO selectIBIMS202BDTOInfo(IBIMS202BDTO param) {
		return tb06010Service.selectIBIMS202BDTOInfo(param);
	}

	// 상환구분/금리정보 등록
	@PostMapping(value = "/registIBIMS202BDTOInfo")
	public int registIBIMS202BDTOInfo(IBIMS202BDTO param) {
		return tb06010Service.registIBIMS202BDTOInfo(param);
	}

	/**********************************/

	// 투자심사승인정보 등록
	@PostMapping(value = "/regIBIMS208B")
	public int regIBIMS208B(@RequestBody IBIMS208BVO param) {
		return tb06010Service.regIBIMS208B(param);
	}

	// 투자심사승인정보 조회
	@GetMapping(value = "/selectIBIMS208B")
	public List<IBIMS208BVO> selectIBIMS208B(IBIMS208BVO param) {
		return tb06010Service.selectIBIMS208B(param);
	}

	// 투자심사승인정보 기본정보 조회
	@GetMapping(value = "/getAppvCndt")
	public IBIMS112BVO getAppvCndt(IBIMS112BDTO param) {
		return tb06010Service.getAppvCndt(param);
	}

	// 투자심사승인조건 연결
	@PostMapping(value = "/connectIBIMS209B")
	public int connectIBIMS209B(IBIMS209BVO param) {
		return tb06010Service.connectIBIMS209B(param);
	}
	
	// 투자심사승인정보 조회
	@GetMapping(value = "/getIBIMS208BDTOInfo")
	public IBIMS208BDTO getIBIMS208BDTOInfo(IBIMS209BDTO param) {
		return tb06010Service.getIBIMS208BDTOInfo(param);
	}

	/**********************************/

	// 담보/보증정보 조회
	@GetMapping(value = "/getIBIMS212BDTOInfo")
	public List<TB06013PVO> getIBIMS212BDTOInfo(TB06013PVO param) {
		return tb06010Service.getIBIMS212BDTOInfo(param);
	}
	
	/**********************************/
	
	// 이해관계자 조회
	@GetMapping(value = "/getIBIMS220BDTOInfo")
	public List<IBIMS220BVO> getIBIMS220BDTOInfo(IBIMS220BVO param) {
		return tb06010Service.getIBIMS220BDTOInfo(param);
	}
	
	// 이해관계자 등록
	@PostMapping(value = "/saveIBIMS220BDTOInfo")
	public int saveIBIMS220BDTOInfo(@RequestBody IBIMS220BVO2 param) {
		return tb06010Service.saveIBIMS220BDTOInfo(param);
	}
	
	/**********************************/
	// (보증)기초자산 조회
	@GetMapping(value = "/getAssetInfo")
	public List<IBIMS205BVO> getAssetInfo(String prdtCd) {
		return tb06010Service.getAssetInfo(prdtCd);
	}
	
	// (보증)기초자산정보 생성
	@PostMapping(value = "/registAssetInfo")
	public int registAssetInfo(IBIMS205BDTO assetInfo) {
		return tb06010Service.registAssetInfo(assetInfo);
	}
	
	// 기초자산정보 제거
	@PostMapping(value = "/deleteAssetInfo")
	public int deleteAssetInfo(IBIMS205BDTO prdtCd) {
		return tb06010Service.deleteAssetInfo(prdtCd);
	}
	/**********************************/
	// 오늘의 할일 등록
	@PostMapping(value = "/insert100BInfo")
	public int insert100BInfo() {
		return tb06010Service.insert100BInfo();
	}
	
}
