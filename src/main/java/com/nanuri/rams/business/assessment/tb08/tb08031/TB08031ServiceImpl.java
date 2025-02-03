package com.nanuri.rams.business.assessment.tb08.tb08031;



import com.nanuri.rams.business.common.dto.IBIMS508BDTO;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS101BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS501BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS502BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS503BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS504BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS505BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS506BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS508BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS509BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS510BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS511BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS512BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS513BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS514BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS515BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS518BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB08031ServiceImpl implements TB08031Service {
	
	private final IBIMS101BMapper ibims101bMapper;

	private final IBIMS501BMapper ibims501BMapper;
	private final IBIMS502BMapper ibims502BMapper;
	private final IBIMS503BMapper ibims503BMapper;
	private final IBIMS504BMapper ibims504BMapper;
	private final IBIMS505BMapper ibims505BMapper;
	private final IBIMS506BMapper ibims506BMapper;
	
	private final IBIMS511BMapper ibims511Mapper;   
	private final IBIMS514BMapper ibims514Mapper;   
	private final IBIMS509BMapper ibims509Mapper;   
	private final IBIMS510BMapper ibims510Mapper;   
	private final IBIMS513BMapper ibims513Mapper;   
	private final IBIMS508BMapper ibims508Mapper;	
	private final IBIMS518BMapper ibims518Mapper;   
	private final IBIMS515BMapper ibims515Mapper;	
	private final IBIMS512BMapper ibims512Mapper;
	private final IBIMS402BMapper ibims402Mapper;
	
	private  final AuthenticationFacade facade;

	@Override
	public IBIMS501BVO getBusiBssInfo(IBIMS501BVO param) {
		IBIMS501BVO rtnObj = new IBIMS501BVO();

		// rtnObj = ibims501BMapper.getBusiBssInfo(param);
		
		// if (null != rtnObj) {

		// 	if(rtnObj.getInvFnnMngmBusiDcd() != null){
		// 		switch( rtnObj.getInvFnnMngmBusiDcd() ) {
		// 			// 부동산
		// 			case "01":
		// 				rtnObj.setRlesInfo(ibims502BMapper.getRealEstateInfo(param.getDealNo()));
		// 				rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
		// 				rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
		// 				rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
		// 				rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
		// 				rtnObj.setStlnInfo(ibims513Mapper.getStlnInfo(param.getDealNo()));
		// 				rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
		// 				break;
		// 			// 인프라
		// 			case "02":
		// 				rtnObj.setInfraInfo(ibims503BMapper.getInfraInfo(param.getDealNo()));
		// 				rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
		// 				rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
		// 				rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
		// 				rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
		// 				rtnObj.setStlnInfo(ibims513Mapper.getStlnInfo(param.getDealNo()));
		// 				rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
		// 				break;
		// 			// M&A			
		// 			case "03":
		// 				rtnObj.setMaInfo(ibims504BMapper.getMaInfo(param.getDealNo()));
		// 				rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
		// 				rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
		// 				rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
		// 				rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
		// 				rtnObj.setStlnInfo(ibims513Mapper.getStlnInfo(param.getDealNo()));
		// 				rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
		// 				rtnObj.setBusiInfo(ibims508Mapper.getBusiInfo(param.getDealNo()));
		// 				rtnObj.setAdmsAsstInfo(ibims512Mapper.getAdmsAsstInfo(param.getDealNo()));
		// 				break;
		// 			// 국제투자	
		// 			case "04":
		// 				rtnObj.setInvstInfo(ibims505BMapper.getInvstInfo(param.getDealNo()));
		// 				rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
		// 				rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
		// 				rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
		// 				rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
		// 				rtnObj.setStlnInfo(ibims513Mapper.getStlnInfo(param.getDealNo()));
		// 				rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
		// 				break;
		// 			// PEF/VC	
		// 			case "05":
		// 				rtnObj.setPefInfo(ibims506BMapper.getPefInfo(param.getDealNo()));
		// 				rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
		// 				rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
		// 				rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
		// 				rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
		// 				rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
		// 				rtnObj.setBusiInfo(ibims508Mapper.getBusiInfo(param.getDealNo()));
		// 				rtnObj.setAdmsAsstInfo(ibims512Mapper.getAdmsAsstInfo(param.getDealNo()));
		// 				rtnObj.setInvstEprzInfo(ibims518Mapper.getInvstBzscalList(param.getDealNo()));
		// 				rtnObj.setAsstWrkngInfo(ibims515Mapper.selectAsstOrtnLst(param.getDealNo()));
		// 				break;
		// 			default : 
		// 				break;
		// 		}
		// 		rtnObj.setLoanInfo(ibims402Mapper.getloanInfo(param.getDealNo()));
		// 		rtnObj.setFundInfo(ibims402Mapper.getFundInfo(param.getDealNo()));
		// 	}else{
		// 		log.debug("rtnObj.getInvFnnMngmBusiDcd() is null!!!");
		// 	}
			
		// }else{
		// 	log.debug("rtnObj is null!!!");
		// }

		// 기본항목 조회
		String dealNo = param.getDealNo();

		IBIMS101BVO ibims101bvo = new IBIMS101BVO();
		ibims101bvo = ibims101bMapper.getBusiBssInfo101B(dealNo);

		rtnObj.setIbims101bvo(ibims101bvo);

		long sn = ibims501BMapper.getMaxSn501B(dealNo);

		//사업 기본정보 조회
		if(sn > 0){
			log.debug("sn있음~~~~");

			rtnObj = ibims501BMapper.getBusiBssInfo501B(param);

			if(rtnObj.getInvFnnMngmBusiDcd() != null){
				switch( rtnObj.getInvFnnMngmBusiDcd() ) {
					// 부동산
					case "01":
						rtnObj.setRlesInfo(ibims502BMapper.getRealEstateInfo(param.getDealNo()));
						rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
						rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
						rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
						rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
						rtnObj.setStlnInfo(ibims513Mapper.getStlnInfo(param.getDealNo()));
						rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
						break;
					// 인프라
					case "02":
						rtnObj.setInfraInfo(ibims503BMapper.getInfraInfo(param.getDealNo()));
						rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
						rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
						rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
						rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
						rtnObj.setStlnInfo(ibims513Mapper.getStlnInfo(param.getDealNo()));
						rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
						break;
					// M&A			
					case "03":
						rtnObj.setMaInfo(ibims504BMapper.getMaInfo(param.getDealNo()));
						rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
						rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
						rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
						rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
						rtnObj.setStlnInfo(ibims513Mapper.getStlnInfo(param.getDealNo()));
						rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
						rtnObj.setBusiInfo(ibims508Mapper.getBusiInfo(param.getDealNo()));
						rtnObj.setAdmsAsstInfo(ibims512Mapper.getAdmsAsstInfo(param.getDealNo()));
						break;
					// 국제투자	
					case "04":
						rtnObj.setInvstInfo(ibims505BMapper.getInvstInfo(param.getDealNo()));
						rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
						rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
						rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
						rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
						rtnObj.setStlnInfo(ibims513Mapper.getStlnInfo(param.getDealNo()));
						rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
						break;
					// PEF/VC	
					case "05":
						rtnObj.setPefInfo(ibims506BMapper.getPefInfo(param.getDealNo()));
						rtnObj.setBsnsPartInfo(ibims511Mapper.getBsnsPartInfo(param.getDealNo()));
						rtnObj.setBsnsForecast(ibims514Mapper.getBsnsForecast(param.getDealNo()));
						rtnObj.setBondProtInfo(ibims509Mapper.getBondProtInfo(param.getDealNo()));
						rtnObj.setCchInfo(ibims510Mapper.getCchInfo(param.getDealNo()));
						rtnObj.setErnInfo(ibims513Mapper.getErnInfo(param.getDealNo()));
						rtnObj.setBusiInfo(ibims508Mapper.getBusiInfo(param.getDealNo()));
						rtnObj.setAdmsAsstInfo(ibims512Mapper.getAdmsAsstInfo(param.getDealNo()));
						rtnObj.setInvstEprzInfo(ibims518Mapper.getInvstBzscalList(param.getDealNo()));
						rtnObj.setAsstWrkngInfo(ibims515Mapper.selectAsstOrtnLst(param.getDealNo()));
						break;
					default : 
						break;
				}
				rtnObj.setLoanInfo(ibims402Mapper.getloanInfo(param.getDealNo()));
				rtnObj.setFundInfo(ibims402Mapper.getFundInfo(param.getDealNo()));
			}else{
				log.debug("rtnObj.getInvFnnMngmBusiDcd() 없음!!!!");
			}

		}else{
			log.debug("sn없음~~~~");
		}

		return rtnObj;
	}

	
	
	@Override
	public int saveDealInfo(IBIMS501BVO param) {
		param.setHndEmpno(facade.getDetails().getEno());
		ibims501BMapper.saveBusiBssInfo(param);
			switch( param.getInvFnnMngmBusiDcd() ) {
				// 부동산
				case "01":
					param.getRlesInfo().setHndEmpno(facade.getDetails().getEno());
					return ibims502BMapper.saveDealInfo(param);
				// 인프라
				case "02":
					param.getInfraInfo().setHndEmpno(facade.getDetails().getEno());
					return ibims503BMapper.saveInfInfo(param);
				// M&A			
				case "03":
					param.getMaInfo().setHndEmpno(facade.getDetails().getEno());
					return ibims504BMapper.saveMaInfo(param); 
				// 국제투자	
				case "04":
					param.getInvstInfo().setHndEmpno(facade.getDetails().getEno());
					if( null != ibims505BMapper.getInvstInfo(param.getDealNo()) ) {
						return ibims505BMapper.updateInvstInfo(param.getInvstInfo());
					} else {
						return ibims505BMapper.saveInvstInfo(param);
					}
					
				// PEF/VC	
				case "05":
					param.getPefInfo().setHndEmpno(facade.getDetails().getEno());
					param.getPefInfo().setDealNo(param.getDealNo());					
					if( null != ibims506BMapper.getPefInfo(param.getDealNo())) {
						return ibims506BMapper.updatePefInfo(param.getPefInfo());
					} else {
						return ibims506BMapper.savePefInfo(param);
					}
				default :
					param.getRlesInfo().setHndEmpno(facade.getDetails().getEno());
					return ibims502BMapper.saveDealInfo(param);
			}
	}

	// 사업참가자정보 저장
	@Override
	public int saveBsnsPartInfo(IBIMS511BVO2 param) {
		if( 0 == param.getS511vo().size()) {
			 return ibims511Mapper.delBsnsPartInfo(param.getDealNo());
		}else {
			ibims511Mapper.delBsnsPartInfo(param.getDealNo());
			return ibims511Mapper.saveBsnsPartInfo(param.getS511vo()); 
		}
	}

	// 사업주요전망 저장
	@Override
	public int saveBsnsForecast(IBIMS514BVO2 param) {
		if( 0 == param.getS514vo().size()) {
			return ibims514Mapper.delBsnsForecast(param.getDealNo()); 
		}else {
			ibims514Mapper.delBsnsForecast(param.getDealNo());
			return ibims514Mapper.saveBsnsForecast(param.getS514vo());
		}
	}

	// 채권보전주요약정 저장
	@Override
	public int saveBondProtInfo(IBIMS509BVO2 param) {
		if( 0 == param.getS509vo().size() ) {
			return ibims509Mapper.delBondProtInfo(param.getDealNo());
		}else {
			ibims509Mapper.delBondProtInfo(param.getDealNo());
			return ibims509Mapper.saveBondProtInfo(param.getS509vo());
		}
	}

	// 조건변경이력 저장
	@Override
	public int saveCchInfo(IBIMS510BVO2 param) {
		if( 0 == param.getS510vo().size() ) {
			return ibims510Mapper.delCchInfo(param.getDealNo());	
		} else {
			ibims510Mapper.delCchInfo(param.getDealNo());
			return ibims510Mapper.saveCchInfo(param.getS510vo());
		}
	}

	// 대주단정보 저장
	@Override
	public int saveStlnInfo(IBIMS513BVO2 param) {
		if( 0 == param.getS513vo().size() ) {
			return ibims513Mapper.delStlnInfo(param.getDealNo());
		} else {
			ibims513Mapper.delStlnInfo(param.getDealNo());
			return ibims513Mapper.saveStlnInfo(param.getS513vo());
		}
	}

	// 수익자정보 저장
	@Override
	public int saveErnInfo(IBIMS513BVO2 param) {
		if( 0 == param.getS513vo().size() ) {
			return ibims513Mapper.delErnInfo(param.getDealNo());
		} else {
			ibims513Mapper.delErnInfo(param.getDealNo());
			return ibims513Mapper.saveErnInfo(param.getS513vo());
		}
	}

	// 관련사업정보 저장
	@Override
	public int saveReltBusiInfo(IBIMS508BVO2 param) {
		if( 0 == param.getS508vo().size() ) {
			return ibims508Mapper.delBusiInfo(param.getDealNo());
		} else {
			ibims508Mapper.delBusiInfo(param.getDealNo());
			/* 사용자 사번 넣기 */
			List<IBIMS508BVO> inputParam = new ArrayList<>();

			for( IBIMS508BVO tmpData : param.getS508vo() ){
				tmpData.setHndEmpno(facade.getDetails().getEno());
				inputParam.add(tmpData);
			}
			return ibims508Mapper.saveBusiInfo(inputParam);
		}
	}

	// 관련사업정보 저장
	@Override
	public int saveAdmsAsstInfo(IBIMS512BVO2 param) {
		if( 0 == param.getS512vo().size() ) {
			return ibims512Mapper.delAdmsAsstInfo(param.getDealNo());
		} else {
			ibims512Mapper.delAdmsAsstInfo(param.getDealNo());
			/* 사용자 사번 넣기 */
			List<IBIMS512BVO> inputParam = new ArrayList<>();

			for( IBIMS512BVO tmpData : param.getS512vo() ){
				tmpData.setHndEmpno(facade.getDetails().getEno());
				inputParam.add(tmpData);
			}
			return ibims512Mapper.saveAdmsAsstInfo(inputParam);
		}
	}

	// 관련사업정보 저장
	@Override
	public int saveInvstEprzInfo(IBIMS518BVO2 param) {
		if( 0 == param.getS518vo().size() ) {
			return ibims518Mapper.delInvstEprzInfo(param.getDealNo());
		} else {
			ibims518Mapper.delInvstEprzInfo(param.getDealNo());
			/* 사용자 사번 넣기 */
			List<IBIMS518BVO> inputParam = new ArrayList<>();

			for( IBIMS518BVO tmpData : param.getS518vo() ){
				tmpData.setHndEmpno(facade.getDetails().getEno());
				inputParam.add(tmpData);
			}
			return ibims518Mapper.saveInvstEprzInfo(inputParam);
		}
	}

	
	// 자산운용사정보 저장
	@Override
	public int saveAsstOrtnInfo(IBIMS515BVO2 param) {
		if( 0 == param.getS515vo().size()) {
			return ibims515Mapper.delAsstOrtnInfo(param.getDealNo()); 
		}else {
			ibims515Mapper.delAsstOrtnInfo(param.getDealNo());
			/* 사용자 사번 넣기 */
			List<IBIMS515BVO> inputParam = new ArrayList<>();

			for( IBIMS515BVO tmpData : param.getS515vo() ){
				tmpData.setHndEmpno(facade.getDetails().getEno());
				inputParam.add(tmpData);
			}			
			return ibims515Mapper.saveAsstOrtnInfo(inputParam);
		}
	}

}
