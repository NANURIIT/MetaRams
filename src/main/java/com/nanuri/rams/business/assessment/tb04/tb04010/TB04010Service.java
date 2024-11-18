package com.nanuri.rams.business.assessment.tb04.tb04010;

import java.util.List;

import org.springframework.stereotype.Service;

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

@Service
public interface TB04010Service {

	/**
	 * deal list 가져오기
	 * 
	 * @param DealInfo(VO)
	 */
	public List<IBIMS103BVO> getDealList(IBIMS103BVO dealDto);

	/**
	 * deal detail info 가져오기
	 * 
	 * @param ibDealNo(String)
	 */
	public IBIMS103BDTO getDealDetailInfo(IBIMS103BDTO dealDto);

	/**
	 * 안건삭제
	 * 
	 * @param ibDealNo(String)	// 딜번호
	 * @param mtrDcd(String)	// 부수안건구분코드
	 * @param jdgmDcd(String)	// 신규/재부의정보
	 * @param mtrPrgSttsDcd		// 심사진행상태코드
	 */
	public int deleteDealInfo(IBIMS103BDTO delParam);


	// deal 심사요청
	public int assesmentRequest(IBIMS103BDTO param);

	// ---------------tab1 start------------------

	// 신규 deal 생성
	public int registDealInfo(IBIMS103BDTO paramData);

	// ---------------tab2 start------------------

	// 관련문서목록 조회
	public List<IBIMS104BDTO> getDocInfo(IBIMS104BDTO docInfo);

	// 관련문서정보 제거
	public int deleteDocInfo(IBIMS104BDTO docInfo);

	// 관련문서정보 생성
	public int registDocInfo(IBIMS104BDTO docInfo);

	// ---------------tab3 start------------------

	// 기초자산정보 취득
	public List<IBIMS105BVO> getAssetInfo(IBIMS105BDTO assetInfo);

	// 기초자산정보 생성
	public int registAssetInfo(IBIMS105BDTO assetInfo);

	// 기초자산정보 제거
	public int deleteAssetInfo(IBIMS105BDTO assetInfo);

	// 기초자산입력 예정 여부 생성
	public int registBscAstsInptExptF(IBIMS103BDTO paramData);

	// ---------------tab4 start------------------

	// 관계사정보 취득
	public List<IBIMS106BVO> getCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo);

	// 관계사정보 생성
	public int registCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo);

	// 관계사정보 삭제
	public int deleteCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo);

	// 기초자산입력 예정 여부 생성
	public int registCncCmpnyInptExptF(IBIMS103BDTO paramData);

	// ---------------tab5 start------------------
	// 내부등급정보 취득
	public List<IBIMS107BVO> getInsGrdInfo(IBIMS107BDTO insGrdInfo);

	// 내부등급정보 생성
	public int registInsGrdInfo(IBIMS107BDTO insGrdInfo);

	// 내부등급정보 제거
	public int deleteInsGrdInfo(IBIMS107BDTO insGrdInfo);

	// 내부등급 예정 여부 생성
	public int registInsGrdInptExptF(IBIMS103BDTO paramData);

	// ---------------tab6 start------------------

	// 담보정보 취득
	public List<IBIMS108BVO> getMrtgInfo(IBIMS108BDTO mrtgInfo);

	// 담보정보 생성
	public int registMrtgInfo(IBIMS108BDTO mrtgInfo);

	// 담보정보 삭제
	public int deleteMrtgInfo(IBIMS108BDTO mrtgInfo);

	// ---------------tab7 start------------------

	// 보증기관정보 취득
	public List<IBIMS109BVO> getEnsrInfo(IBIMS109BDTO ensrInfo);

	// 보증기관정보 저장
	public int registEnsrInfo(IBIMS109BDTO ensrInfo);

	// 보증기관정보 삭제
	public int deleteEnsrInfo(IBIMS109BDTO ensrInfo);

	// ---------------tab8 start------------------

	// 책임준공기관정보 취득
	public List<IBIMS110BVO> getCmplInfo(IBIMS110BDTO cmplInfo);

	// 책임준공기관정보 저장
	public int registCmplInfo(IBIMS110BDTO cmplInfo);

	// 책임준공기관정보 삭제
	public int deleteCmplInfo(IBIMS110BDTO cmplInfo);

}
