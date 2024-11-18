package com.nanuri.rams.business.assessment.tb04.tb04010;

import java.text.ParseException;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS104BDTO;
import com.nanuri.rams.business.common.dto.IBIMS105BDTO;
import com.nanuri.rams.business.common.dto.IBIMS106BDTO;
import com.nanuri.rams.business.common.dto.IBIMS107BDTO;
import com.nanuri.rams.business.common.dto.IBIMS108BDTO;
import com.nanuri.rams.business.common.dto.IBIMS109BDTO;
import com.nanuri.rams.business.common.dto.IBIMS110BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.IBIMS105BVO;
import com.nanuri.rams.business.common.vo.IBIMS106BVO;
import com.nanuri.rams.business.common.vo.IBIMS107BVO;
import com.nanuri.rams.business.common.vo.IBIMS108BVO;
import com.nanuri.rams.business.common.vo.IBIMS109BVO;
import com.nanuri.rams.business.common.vo.IBIMS110BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB04010S")
@RequiredArgsConstructor
@RestController
public class TB04010APIController {

	private final TB04010Service tb04010Service; 

	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	@GetMapping(value = "/getDealList")
	public List<IBIMS103BVO> getDealList(IBIMS103BVO dealDto) throws ParseException {
		return tb04010Service.getDealList(dealDto);
	}

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	@GetMapping(value = "/getDealDetailInfo")
	public IBIMS103BDTO getDealDetailInfo(IBIMS103BDTO dealDto) {
		return tb04010Service.getDealDetailInfo(dealDto);
	}

	// deal 심사요청
	@PostMapping(value = "/assesmentRequest")
	public int assesmentRequest(IBIMS103BDTO param) {
		return tb04010Service.assesmentRequest(param);
	}

	// ---------------tab1 start------------------

	// 신규 deal 생성
	@Transactional
	@PostMapping(value = "/registDealInfo")
	public int registDealInfo(IBIMS103BDTO paramData){
		return tb04010Service.registDealInfo(paramData);
	}

	// 안건 삭제
	@PostMapping(value = "/deleteDealInfo")
	public int deleteDealInfo(IBIMS103BDTO param) {
		log.debug("ㅁㅁㅁㅁ" + param.getMtrPrgSttsDcd());
		return tb04010Service.deleteDealInfo(param);
	}

	// ---------------tab2 start------------------

	// 관련문서목록 조회
	@GetMapping(value = "/getDocInfo")
	public List<IBIMS104BDTO> getDocInfo(IBIMS104BDTO docInfo) {
		return tb04010Service.getDocInfo(docInfo);
	}

	// 관련문서정보 제거
	@PostMapping(value = "/deleteDocInfo")
	public int deleteDocInfo(IBIMS104BDTO docInfo) {
		return tb04010Service.deleteDocInfo(docInfo);
	}

	// 관련문서정보 생성
	@PostMapping(value = "/registDocInfo")
	public int registDocInfo(IBIMS104BDTO docInfo) {
		return tb04010Service.registDocInfo(docInfo);
	}
	
	// ---------------tab3 start------------------
	
	// 기초자산정보 취득
	@GetMapping(value = "/getAssetInfo")
	public List<IBIMS105BVO> getAssetInfo(IBIMS105BDTO assetInfo) {
		return tb04010Service.getAssetInfo(assetInfo);
	}
	
	// 기초자산정보 생성
	@PostMapping(value = "/registAssetInfo")
	public int registAssetInfo(IBIMS105BDTO assetInfo) {
		return tb04010Service.registAssetInfo(assetInfo);
	}

	// 기초자산정보 제거
	@PostMapping(value = "/deleteAssetInfo")
	public int deleteAssetInfo(IBIMS105BDTO assetInfo) {
		return tb04010Service.deleteAssetInfo(assetInfo);
	}
	
	// 기초자산입력 예정 여부 생성
	@PostMapping(value = "/registBscAstsInptExptF")
	public int registBscAstsInptExptF(IBIMS103BDTO paramData) {
		return tb04010Service.registBscAstsInptExptF(paramData);
	}
	// ---------------tab4 start------------------
	
	// 관계사정보 취득
	@GetMapping(value = "/getCncCmpnyInfo")
	public List<IBIMS106BVO> getCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo) {
		return tb04010Service.getCncCmpnyInfo(cncCmpnyInfo);
	}
	
	// 관계사정보 생성
	@PostMapping(value = "/registCncCmpnyInfo")
	public int registCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo) {
		return tb04010Service.registCncCmpnyInfo(cncCmpnyInfo);
	}

	// 관계사정보 제거
	@PostMapping(value = "/deleteCncCmpnyInfo")
	public int deleteCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo) {
		return tb04010Service.deleteCncCmpnyInfo(cncCmpnyInfo);
	}
	
	// 기초자산입력 예정 여부 생성
	@PostMapping(value = "/registCncCmpnyInptExptF")
	public int registCncCmpnyInptExptF(IBIMS103BDTO paramData) {
		return tb04010Service.registCncCmpnyInptExptF(paramData);
	}
	
	// ---------------tab5 start------------------
	
	// 내부등급정보 취득
	@GetMapping(value = "/getInsGrdInfo")
	public List<IBIMS107BVO> getInsGrdInfo(IBIMS107BDTO insGrdInfo) {
		return tb04010Service.getInsGrdInfo(insGrdInfo);
	}
	
	// 내부등급정보 생성
	@PostMapping(value = "/registInsGrdInfo")
	public int registInsGrdInfo(IBIMS107BDTO insGrdInfo) {
		return tb04010Service.registInsGrdInfo(insGrdInfo);
	}
	
	// 관계사정보 제거
	@PostMapping(value = "/deleteInsGrdInfo")
	public int deleteInsGrdInfo(IBIMS107BDTO insGrdInfo) {
		return tb04010Service.deleteInsGrdInfo(insGrdInfo);
	}
	
	// 내부등급 예정 여부 생성
	@PostMapping(value = "/registInsGrdInptExptF")
	public int registInsGrdInptExptF(IBIMS103BDTO paramData) {
		return tb04010Service.registInsGrdInptExptF(paramData);
	}

	// ---------------tab6 start------------------
	
	// 담보정보 취득 
	@GetMapping(value = "/getMrtgInfo")
	public List<IBIMS108BVO> getMrtgInfo(IBIMS108BDTO mrtgInfo) {
		return tb04010Service.getMrtgInfo(mrtgInfo);
	}
	
	// 담보정보 저장
	@PostMapping(value = "/registMrtgInfo")
	public int registMrtgInfo(IBIMS108BDTO mrtgInfo) {
		return tb04010Service.registMrtgInfo(mrtgInfo);
	}

	// 담보정보 삭제
	@PostMapping(value = "/deleteMrtgInfo")
	public int deleteMrtgInfo(IBIMS108BDTO mrtgInfo) {
		return tb04010Service.deleteMrtgInfo(mrtgInfo);
	}

	// ---------------tab7 start------------------

	// 보증기관정보 취득
	@GetMapping(value = "/getEnsrInfo")
	public List<IBIMS109BVO> getEnsrInfo(IBIMS109BDTO ensrInfo) {
		return tb04010Service.getEnsrInfo(ensrInfo);
	}

	// 보증기관정보 저장
	@PostMapping(value = "/registEnsrInfo")
	public int registEnsrInfo(IBIMS109BDTO ensrInfo) {
		return tb04010Service.registEnsrInfo(ensrInfo);
	}

	// 보증기관정보 삭제
	@PostMapping(value = "/deleteEnsrInfo")
	public int deleteEnsrInfo(IBIMS109BDTO ensrInfo) {
		return tb04010Service.deleteEnsrInfo(ensrInfo);
	}
	
	// ---------------tab8 start------------------

	// 책임준공기관정보 취득
	@GetMapping(value = "/getCmplInfo")
	public List<IBIMS110BVO> getCmplInfo(IBIMS110BDTO cmplInfo) {
		return tb04010Service.getCmplInfo(cmplInfo);
	}

	// 책임준공기관정보 저장
	@PostMapping(value = "/registCmplInfo")
	public int registCmplInfo(IBIMS110BDTO cmplInfo) {
		return tb04010Service.registCmplInfo(cmplInfo);
	}

	// 책임준공기관정보 삭제
	@PostMapping(value = "/deleteCmplInfo")
	public int deleteCmplInfo(IBIMS110BDTO cmplInfo) {
		return tb04010Service.deleteCmplInfo(cmplInfo);
	}

}
