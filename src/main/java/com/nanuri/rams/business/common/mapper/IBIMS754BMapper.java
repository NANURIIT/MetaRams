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
    List<IBIMS754BDTO> selectIBIMS754B(TB09012SVO data);

    // 조회(IBIMS755B)
    List<IBIMS754BDTO> selectIBIMS755B(TB09012SVO data);

    // 조회(IBIMS756B)
    List<IBIMS754BDTO> selectIBIMS756B(TB09012SVO data);

    // 삭제(IBIMS754B)
    int deleteIBIMS754B(IBIMS754BVO params);

    // 등록(IBIMS754B)
    int insertIBIMS754B(List<IBIMS754BDTO> paramList);

    // 삭제(IBIMS755B)
    int deleteTransList(IBIMS754BVO params);

    // 등록(IBIMS755B)
    int insertTransList(List<IBIMS754BDTO> paramList);

    // 삭제(IBIMS756B)
    int deleteErrList(IBIMS754BVO params);

    // 등록(IBIMS756B)
    int insertErrList(List<IBIMS754BDTO> paramList);
}
