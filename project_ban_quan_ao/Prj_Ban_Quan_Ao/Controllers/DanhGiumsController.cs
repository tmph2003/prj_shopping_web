using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prj_Ban_Quan_Ao.Models;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhGiumsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public DanhGiumsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/DanhGiums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanhGium>>> GetDanhGia()
        {
            return await _context.DanhGia.ToListAsync();
        }

        // GET: api/DanhGiums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DanhGium>> GetDanhGium(Guid id)
        {
            var danhGium = await _context.DanhGia.FindAsync(id);

            if (danhGium == null)
            {
                return NotFound();
            }

            return danhGium;
        }

        // PUT: api/DanhGiums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDanhGium(Guid id, DanhGium danhGium)
        {
            if (id != danhGium.Id)
            {
                return BadRequest();
            }

            _context.Entry(danhGium).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DanhGiumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DanhGiums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DanhGium>> PostDanhGium(DanhGium danhGium)
        {
            _context.DanhGia.Add(danhGium);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDanhGium", new { id = danhGium.Id }, danhGium);
        }

        // DELETE: api/DanhGiums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDanhGium(Guid id)
        {
            var danhGium = await _context.DanhGia.FindAsync(id);
            if (danhGium == null)
            {
                return NotFound();
            }

            _context.DanhGia.Remove(danhGium);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("getdanhgiavesanphambyaccount/{sanPhamId}/{accountId}")]
        public IActionResult GetDanhGiaVeSanPhamByAccount(Guid sanPhamId, Guid accountId)
        {
            var query =
                (from dg in _context.DanhGia
                 join sp in _context.SanPhams on dg.SanPhamId equals sp.Id
                 join ac in _context.Accounts on dg.AccountId equals ac.Id
                 where dg.SanPhamId == sanPhamId
                 && dg.AccountId == accountId
                 orderby dg.NgayTao descending
                 select new
                 {
                     idNguoiDung = ac.Id,
                     tenSp = sp.Ten,
                     tenAc = ac.TenHienThi,
                     duongDanAnhAc = ac.DuongDanAnh,
                     duongDanAnhSp = sp.DuongDanAnh,
                     vote = dg.Vote,
                     kichCo = dg.KichCo,
                     mau = dg.Mau,
                     noiDung = dg.NoiDung,
                     ngayTao = dg.NgayTao,
                 });

            return Ok(query.ToList());
        }

        [HttpGet("getlistdanhgiabyidsanpham/{sanPhamId}")]
        public IActionResult GetListDanhGiaByIdSanPham(Guid sanPhamId)
        {
            var query =
                (from dg in _context.DanhGia
                 join sp in _context.SanPhams on dg.SanPhamId equals sp.Id
                 join ac in _context.Accounts on dg.AccountId equals ac.Id
                 where dg.SanPhamId == sanPhamId
                 orderby dg.NgayTao descending
                 select new
                 {
                     idNguoiDung = ac.Id,
                     tenSp = sp.Ten,
                     tenAc = ac.TenHienThi,
                     duongDanAnhAc = ac.DuongDanAnh,
                     duongDanAnhSp = sp.DuongDanAnh,
                     anhDanhGia = (from adg in _context.AnhDanhGia 
                                   where adg.DanhGiaId == dg.Id select adg).ToList(),
                     vote = dg.Vote,
                     kichCo = dg.KichCo,
                     mau = dg.Mau,
                     noiDung = dg.NoiDung,
                     ngayTao = dg.NgayTao,
                 });

            return Ok(query.ToList());
        }

        private bool DanhGiumExists(Guid id)
        {
            return _context.DanhGia.Any(e => e.Id == id);
        }
    }
}
