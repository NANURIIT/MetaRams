package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS754BDTO;
import com.nanuri.rams.business.common.vo.IBIMS754BVO;
import com.nanuri.rams.business.common.vo.TB09012SVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
/*
 * 법인채무보증등 집중내역
 */
public interface IBIMS754BMapper {

    // 조회(IBIMS754B)
    List<IBIMS754BDTO> cpdgSearch(TB09012SVO data);

    // 조회(IBIMS755B)
    List<IBIMS754BDTO> cpdgTransSearch(TB09012SVO data);

    // 조회(IBIMS756B)
    List<IBIMS754BDTO> cpdgErrSearch(TB09012SVO data);

    // 삭제(IBIMS754B)
    int deleteCpdgFcs(IBIMS754BVO params);

    // 등록(IBIMS754B)
    int insertCpdgFcs(List<IBIMS754BDTO> paramList);

    // 삭제(IBIMS755B)
    int deleteCpdgFcsTrans(IBIMS754BVO params);

    // 등록(IBIMS755B)
    int insertCpdgFcsTrans(List<IBIMS754BDTO> paramList);

    // 삭제(IBIMS756B)
    int deleteCpdgFcsErr(IBIMS754BVO params);

    // 등록(IBIMS756B)
    int insertCpdgFcsErr(List<IBIMS754BDTO> paramList);
}
